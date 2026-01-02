# VolcEngine MCP Server

MCP (Model Context Protocol) Server for VolcEngine Web Search and Image Search APIs.

## Features

- **Web Search**: Search web pages with various filtering options
- **Image Search**: Search images with size and shape filtering
- **Easy to use**: Simple CLI interface
- **TypeScript support**: Full type definitions

## Installation

### Global Installation (Recommended for CLI usage)

```bash
npm install -g volcengine-mcp-server
```

Or use npx directly:

```bash
npx volcengine-mcp-server --help
```

### Local Installation

```bash
npm install volcengine-mcp-server
```

## Usage

### CLI Usage

```bash
# Start the MCP server
npx volcengine-mcp-server

# With API Key
npx volcengine-mcp-server --api-key YOUR_API_KEY

# With custom port
npx volcengine-mcp-server --port 3000

# Show help
npx volcengine-mcp-server --help
```

### Environment Variables

You can also set environment variables:

```bash
export VOLCENGINE_API_KEY=your_api_key
export VOLCENGINE_PORT=3000
```

Then run:
```bash
npx volcengine-mcp-server
```

## API Key

To use this MCP server, you need a VolcEngine API Key:

1. Go to [VolcEngine Console](https://console.volcengine.com/ask-echo/api-key)
2. Navigate to "联网问答智能体-APIKey 管理"
3. Click "融合信息搜索" and create an API Key

## MCP Tools

This server provides the following MCP tools:

### 1. web_search

Search web pages with various options.

**Parameters:**
- `query` (string, required): Search query (1-100 characters)
- `count` (number, optional): Number of results (1-50, default: 10)
- `needContent` (boolean, optional): Return only results with content
- `needUrl` (boolean, optional): Return only results with URL
- `sites` (string, optional): Specific sites to search (pipe-separated)
- `blockHosts` (string, optional): Sites to block (pipe-separated)
- `needSummary` (boolean, optional): Include precise summary
- `timeRange` (string, optional): Time range: OneDay, OneWeek, OneMonth, OneYear, or date range
- `queryRewrite` (boolean, optional): Enable query rewriting

### 2. image_search

Search images with filtering options.

**Parameters:**
- `query` (string, required): Search query (1-100 characters)
- `count` (number, optional): Number of results (1-5, default: 5)
- `imageWidthMin` (number, optional): Minimum image width
- `imageHeightMin` (number, optional): Minimum image height
- `imageWidthMax` (number, optional): Maximum image width
- `imageHeightMax` (number, optional): Maximum image height
- `imageShapes` (string[], optional): Allowed shapes: 横长方形, 竖长方形, 方形
- `queryRewrite` (boolean, optional): Enable query rewriting

## Example Usage with Claude Desktop

Add this to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "volcengine": {
      "command": "npx",
      "args": ["volcengine-mcp-server", "--api-key", "YOUR_API_KEY"]
    }
  }
}
```

## Development

### Build from source

```bash
git clone <repository-url>
cd volcengine-mcp-server
npm install
npm run build
```

### Run in development mode

```bash
npm run dev
```

## License

MIT