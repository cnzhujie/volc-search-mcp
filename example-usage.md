# VolcEngine MCP Server - Example Usage

## Installation and Setup

### 1. Install globally (for CLI usage)
```bash
npm install -g volcengine-mcp-server
```

### 2. Or use with npx (no installation needed)
```bash
npx volcengine-mcp-server --help
```

### 3. Get your API Key
1. Go to [VolcEngine Console](https://console.volcengine.com/ask-echo/api-key)
2. Navigate to "联网问答智能体-APIKey 管理"
3. Click "融合信息搜索" and create an API Key

## Running the MCP Server

### Option 1: Using environment variable
```bash
export VOLCENGINE_API_KEY=your_api_key_here
npx volcengine-mcp-server
```

### Option 2: Using command line argument
```bash
npx volcengine-mcp-server --api-key your_api_key_here
```

### Option 3: With verbose logging
```bash
npx volcengine-mcp-server --api-key your_api_key_here --verbose
```

## Using with Claude Desktop

Add this to your Claude Desktop configuration (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "volcengine": {
      "command": "npx",
      "args": ["volcengine-mcp-server", "--api-key", "YOUR_API_KEY_HERE"]
    }
  }
}
```

## Available Tools

### 1. web_search
Search web pages with various filtering options.

**Example usage in Claude:**
```
Search for information about artificial intelligence developments
```

**Parameters:**
- `query` (required): Search term
- `count` (optional): Number of results (1-50)
- `timeRange` (optional): Filter by time (OneDay, OneWeek, OneMonth, OneYear)
- `sites` (optional): Search only specific sites
- `needSummary` (optional): Include detailed summary

### 2. image_search
Search images with size and shape filtering.

**Example usage in Claude:**
```
Find images of mountain landscapes
```

**Parameters:**
- `query` (required): Search term
- `count` (optional): Number of results (1-5)
- `imageWidthMin`, `imageHeightMin` (optional): Minimum dimensions
- `imageShapes` (optional): Filter by shape (横长方形, 竖长方形, 方形)

## Programmatic Usage

You can also use the client programmatically:

```javascript
const { VolcEngineClient } = require('volcengine-mcp-server');

const client = new VolcEngineClient('your_api_key');

// Web search
const webResults = await client.webSearch({
  query: 'latest technology news',
  count: 5,
  timeRange: 'OneWeek'
});

// Image search
const imageResults = await client.imageSearch({
  query: 'nature',
  count: 3,
  imageShapes: ['横长方形', '方形']
});
```

## Troubleshooting

### Common Issues:

1. **"API Key is required" error**
   - Make sure you've set the API key via environment variable or command line argument
   - Verify the API key is valid and has access to the search API

2. **"Query must be 100 characters or less" error**
   - Shorten your search query to 100 characters or less

3. **No results returned**
   - Try a different search query
   - Check if your API key has sufficient permissions
   - Verify the service is available in your region

4. **Connection errors**
   - Check your internet connection
   - Verify the API endpoint is accessible from your location

## Support

For issues and questions:
- Check the [GitHub repository](https://github.com/your-repo/volcengine-mcp-server)
- Review the [VolcEngine API documentation](https://www.volcengine.com/docs/85508/1650263)