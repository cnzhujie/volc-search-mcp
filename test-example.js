#!/usr/bin/env node

// Example of how to use the MCP server programmatically
// This is just for testing, the actual CLI is in dist/cli.js

const { VolcEngineClient } = require('./dist/volcengine-client.js');

async function testClient() {
  const apiKey = process.env.VOLCENGINE_API_KEY;
  
  if (!apiKey) {
    console.log('Please set VOLCENGINE_API_KEY environment variable');
    console.log('Example: export VOLCENGINE_API_KEY=your_api_key_here');
    return;
  }
  
  const client = new VolcEngineClient(apiKey);
  
  console.log('Testing VolcEngine Client...\n');
  
  try {
    // Test web search
    console.log('1. Testing Web Search:');
    const webResult = await client.webSearch({
      query: '人工智能最新发展',
      count: 3
    });
    
    console.log(`Found ${webResult.resultCount} results`);
    if (webResult.webResults && webResult.webResults.length > 0) {
      webResult.webResults.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.title}`);
        console.log(`   Site: ${item.siteName}`);
        console.log(`   Snippet: ${item.snippet.substring(0, 100)}...`);
      });
    }
    
    console.log('\n2. Testing Image Search:');
    const imageResult = await client.imageSearch({
      query: '风景',
      count: 2
    });
    
    console.log(`Found ${imageResult.resultCount} images`);
    if (imageResult.imageResults && imageResult.imageResults.length > 0) {
      imageResult.imageResults.forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.title || 'Untitled'}`);
        console.log(`   Image URL: ${item.image.url}`);
        console.log(`   Shape: ${item.image.shape}`);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testClient();
}

module.exports = { testClient };