#!/usr/bin/env node

import axios from 'axios';

const API_KEY = 'Xz4YootqrCtrpHtQZbdYcHCZBX2zOkiA';
const BASE_URL = 'https://open.feedcoopapi.com';

async function testApiDirectly() {
  console.log('🔍 Testing VolcEngine API directly...\n');
  
  const requestBody = {
    Query: '2025年1月2日 A股 市值 总市值 最新数据',
    SearchType: 'web',
    Count: 10,
    Filter: {
      NeedContent: false,
      NeedUrl: false,
      Sites: '',
      BlockHosts: ''
    },
    NeedSummary: false,
    TimeRange: '',
    QueryControl: {
      QueryRewrite: false
    }
  };
  
  console.log('Request body:', JSON.stringify(requestBody, null, 2));
  
  try {
    const response = await axios.post(
      `${BASE_URL}/search_api/web_search`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        timeout: 30000
      }
    );
    
    console.log('\n✅ API Response received');
    console.log('Status:', response.status);
    console.log('Status text:', response.statusText);
    
    // 检查响应结构
    console.log('\nResponse data keys:', Object.keys(response.data));
    
    if (response.data.Result) {
      console.log('Result keys:', Object.keys(response.data.Result));
      console.log('Result:', JSON.stringify(response.data.Result, null, 2));
      
      // 检查是否有webResults
      if (response.data.Result.webResults) {
        console.log(`\nwebResults length: ${response.data.Result.webResults.length}`);
        if (response.data.Result.webResults.length > 0) {
          console.log('First result:', JSON.stringify(response.data.Result.webResults[0], null, 2));
        }
      } else {
        console.log('\n⚠️ No webResults in response');
      }
      
      // 检查是否有resultCount
      console.log('resultCount:', response.data.Result.resultCount);
    } else {
      console.log('⚠️ No Result in response');
      console.log('Full response:', JSON.stringify(response.data, null, 2));
    }
    
    // 检查是否有错误
    if (response.data.Error) {
      console.log('\n❌ API Error:', response.data.Error);
    }
    
  } catch (error) {
    console.error('\n❌ API Request failed:');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Status text:', error.response.statusText);
      console.log('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.log('No response received:', error.message);
    } else {
      console.log('Error setting up request:', error.message);
    }
  }
}

testApiDirectly();