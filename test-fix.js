#!/usr/bin/env node

import { VolcEngineClient } from './dist/volcengine-client.js';

async function testFix() {
  console.log('🔍 Testing the fix for VolcEngine API response parsing...\n');
  
  const client = new VolcEngineClient('Xz4YootqrCtrpHtQZbdYcHCZBX2zOkiA');
  
  console.log('1. Testing webSearch with valid query...');
  try {
    const result = await client.webSearch({
      query: '2025年1月2日 A股 市值 总市值 最新数据',
      count: 5
    });
    
    console.log('   ✅ Success!');
    console.log('   resultCount:', result.resultCount);
    console.log('   webResults length:', result.webResults?.length || 0);
    console.log('   imageResults length:', result.imageResults?.length || 0);
    console.log('   searchContext:', result.searchContext);
    console.log('   timeCost:', result.timeCost);
    console.log('   logId:', result.logId);
    
    if (result.webResults && result.webResults.length > 0) {
      console.log('\n   First result:');
      console.log('   - Title:', result.webResults[0].title);
      console.log('   - Site:', result.webResults[0].siteName);
      console.log('   - URL:', result.webResults[0].url);
      console.log('   - Snippet (first 100 chars):', result.webResults[0].snippet?.substring(0, 100) + '...');
    }
    
  } catch (error) {
    console.error('   ❌ Error:', error.message);
    console.error('   Stack:', error.stack);
  }
  
  console.log('\n2. Testing with empty result (simulating null response)...');
  try {
    // 这里我们无法模拟null响应，但可以测试错误处理
    const result = await client.webSearch({
      query: 'some very specific query that might return null',
      count: 1
    });
    
    console.log('   ✅ Success!');
    console.log('   resultCount:', result.resultCount);
    console.log('   webResults length:', result.webResults?.length || 0);
    
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
  
  console.log('\n3. Testing imageSearch...');
  try {
    const result = await client.imageSearch({
      query: 'beautiful landscape',
      count: 3
    });
    
    console.log('   ✅ Success!');
    console.log('   resultCount:', result.resultCount);
    console.log('   imageResults length:', result.imageResults?.length || 0);
    
    if (result.imageResults && result.imageResults.length > 0) {
      console.log('\n   First image result:');
      console.log('   - Image URL:', result.imageResults[0].image?.url);
      console.log('   - Shape:', result.imageResults[0].image?.shape);
    }
    
  } catch (error) {
    console.error('   ❌ Error:', error.message);
  }
  
  console.log('\n🎯 Test completed');
}

testFix().catch(console.error);