#!/usr/bin/env node

import { VolcEngineMCPServer } from './dist/mcp-server.js';

async function testDebug() {
  console.log('🔍 Debugging MCP Server...\n');
  
  const server = new VolcEngineMCPServer('Xz4YootqrCtrpHtQZbdYcHCZBX2zOkiA');
  
  console.log('1. Testing handleWebSearch directly...');
  try {
    const result = await server.handleWebSearch({
      query: '2025年1月2日 A股 市值 总市值 最新数据',
      count: 5
    });
    
    console.log('   ✅ Success!');
    console.log('   Result type:', typeof result);
    console.log('   Result keys:', Object.keys(result));
    
    if (result.content && result.content[0]) {
      const text = result.content[0].text;
      console.log('   Text length:', text.length);
      console.log('   First 200 chars:', text.substring(0, 200));
      
      // 检查是否包含"Found 0 results"
      if (text.includes('Found 0 results')) {
        console.log('\n   ⚠️ Problem: Found 0 results');
        
        // 让我们直接测试client
        console.log('\n2. Testing client directly...');
        const { VolcEngineClient } = await import('./dist/volcengine-client.js');
        const client = new VolcEngineClient('Xz4YootqrCtrpHtQZbdYcHCZBX2zOkiA');
        
        const clientResult = await client.webSearch({
          query: '2025年1月2日 A股 市值 总市值 最新数据',
          count: 5
        });
        
        console.log('   Client resultCount:', clientResult.resultCount);
        console.log('   Client webResults length:', clientResult.webResults?.length || 0);
        
        if (clientResult.webResults && clientResult.webResults.length > 0) {
          console.log('   First result title:', clientResult.webResults[0].title);
        }
      }
    }
    
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    console.error('   Stack:', error.stack);
  }
  
  console.log('\n🎯 Debug completed');
}

testDebug().catch(console.error);