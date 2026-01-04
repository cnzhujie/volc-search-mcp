#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Testing MCP Client with VolcEngine Search Server\n');

// 启动MCP服务器
console.log('1. Starting MCP server...');
const server = spawn('node', [join(__dirname, 'dist/cli.js'), '--verbose'], {
  env: { ...process.env, VOLCENGINE_API_KEY: 'Xz4YootqrCtrpHtQZbdYcHCZBX2zOkiA' },
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverOutput = '';
server.stderr.on('data', (data) => {
  const text = data.toString();
  serverOutput += text;
  if (text.includes('running on stdio')) {
    console.log('   ✅ Server started');
    testMCPProtocol();
  }
});

server.on('error', (err) => {
  console.error('   ❌ Server error:', err.message);
  process.exit(1);
});

// 测试MCP协议
function testMCPProtocol() {
  console.log('\n2. Testing MCP protocol initialization...');
  
  const initRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'Test Client',
        version: '1.0.0'
      }
    }
  };
  
  server.stdin.write(JSON.stringify(initRequest) + '\n');
  
  // 设置响应监听
  let responseBuffer = '';
  const onData = (data) => {
    responseBuffer += data.toString();
    try {
      const response = JSON.parse(responseBuffer);
      if (response.id === 1) {
        console.log('   ✅ Initialization response received');
        console.log('   Server info:', response.result?.serverInfo);
        listTools();
      }
      responseBuffer = '';
    } catch (e) {
      // 数据不完整，继续等待
    }
  };
  
  server.stdout.on('data', onData);
  
  // 超时处理
  setTimeout(() => {
    console.log('   ❌ Initialization timeout');
    cleanup();
  }, 5000);
}

// 列出工具
function listTools() {
  console.log('\n3. Listing available tools...');
  
  const listRequest = {
    jsonrpc: '2.0',
    id: 2,
    method: 'tools/list'
  };
  
  server.stdin.write(JSON.stringify(listRequest) + '\n');
  
  let responseBuffer = '';
  const onData = (data) => {
    responseBuffer += data.toString();
    try {
      const response = JSON.parse(responseBuffer);
      if (response.id === 2) {
        console.log('   ✅ Tools listed successfully');
        console.log('   Available tools:', response.result?.tools?.map(t => t.name));
        testWebSearch();
      }
      responseBuffer = '';
    } catch (e) {
      // 数据不完整，继续等待
    }
  };
  
  server.stdout.on('data', onData);
}

// 测试网页搜索
function testWebSearch() {
  console.log('\n4. Testing web_search tool...');
  console.log('   Query: "2025年1月2日 A股 市值 总市值 最新数据"');
  console.log('   Count: 10');
  
  const searchRequest = {
    jsonrpc: '2.0',
    id: 3,
    method: 'tools/call',
    params: {
      name: 'web_search',
      arguments: {
        query: '2025年1月2日 A股 市值 总市值 最新数据',
        count: 10
      }
    }
  };
  
  server.stdin.write(JSON.stringify(searchRequest) + '\n');
  
  let responseBuffer = '';
  const onData = (data) => {
    responseBuffer += data.toString();
    try {
      const response = JSON.parse(responseBuffer);
      if (response.id === 3) {
        console.log('\n   ✅ Search response received');
        console.log('   Response ID:', response.id);
        
        if (response.error) {
          console.log('   ❌ Error:', response.error);
          console.log('   Error code:', response.error.code);
          console.log('   Error message:', response.error.message);
        } else if (response.result) {
          console.log('   Result type:', response.result?.content?.[0]?.type);
          console.log('   Result text length:', response.result?.content?.[0]?.text?.length);
          
          // 尝试解析结果文本
          const resultText = response.result?.content?.[0]?.text;
          if (resultText) {
            console.log('\n   Result preview (first 500 chars):');
            console.log('   ' + resultText.substring(0, 500) + '...');
            
            // 检查是否有"Found undefined results"错误
            if (resultText.includes('Found undefined results')) {
              console.log('\n   🔍 PROBLEM DETECTED: "Found undefined results"');
              console.log('   This suggests the API response parsing is failing.');
              console.log('   Let me check the raw response structure...');
              
              // 尝试查看原始响应结构
              try {
                const parsed = JSON.parse(resultText);
                console.log('   Parsed JSON structure:', Object.keys(parsed));
              } catch (e) {
                console.log('   Result is not JSON, it\'s plain text');
              }
            }
          } else {
            console.log('   ❌ No result text found');
            console.log('   Full result:', JSON.stringify(response.result, null, 2));
          }
        }
        
        cleanup();
      }
      responseBuffer = '';
    } catch (e) {
      // 数据不完整，继续等待
    }
  };
  
  server.stdout.on('data', onData);
  
  // 超时处理
  setTimeout(() => {
    console.log('   ❌ Search request timeout');
    cleanup();
  }, 10000);
}

// 清理
function cleanup() {
  console.log('\n5. Cleaning up...');
  server.kill();
  console.log('   ✅ Server stopped');
  console.log('\n🎯 Test completed');
  process.exit(0);
}

// 全局错误处理
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  cleanup();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  cleanup();
});