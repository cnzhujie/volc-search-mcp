# Using VolcEngine MCP Server with npx

## Quick Start

### 1. Direct npx usage (no installation needed)
```bash
# Set your API key as environment variable
export VOLCENGINE_API_KEY=your_api_key_here

# Run the MCP server
npx volcengine-mcp-server
```

### 2. Or pass API key directly
```bash
npx volcengine-mcp-server --api-key your_api_key_here
```

## What You Get

When you run the command, you'll get a fully functional MCP server that provides:

### Two Search Tools:
1. **`web_search`** - Search web pages with filtering options
2. **`image_search`** - Search images with size and shape filtering

### Example Claude Desktop Integration

Add to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "volcengine": {
      "command": "npx",
      "args": [
        "volcengine-mcp-server",
        "--api-key",
        "YOUR_ACTUAL_API_KEY_HERE"
      ]
    }
  }
}
```

## Testing the Server

### 1. Check if it runs
```bash
npx volcengine-mcp-server --help
```

### 2. Test with verbose mode
```bash
npx volcengine-mcp-server --api-key YOUR_KEY --verbose
```

## How It Works

1. **npx downloads** the package from npm (if not already installed)
2. **Starts the MCP server** on stdio (standard input/output)
3. **Provides two tools** that Claude can use:
   - `web_search(query, count, timeRange, ...)`
   - `image_search(query, count, imageShapes, ...)`

## Requirements

- Node.js 18 or higher
- A valid VolcEngine API Key
- Internet connection

## Troubleshooting

### If you see "API Key is required":
```bash
# Make sure to set the API key
export VOLCENGINE_API_KEY=your_key
# Or use the --api-key option
npx volcengine-mcp-server --api-key your_key
```

### If you see permission errors:
```bash
# On Linux/Mac, you might need to make the file executable
chmod +x $(which node)
```

### If the server doesn't start:
```bash
# Check Node.js version
node --version  # Should be >= 18

# Try with verbose logging
npx volcengine-mcp-server --api-key your_key --verbose
```

## Advanced Usage

### Using with other MCP clients
The server works with any MCP-compatible client, not just Claude Desktop.

### Programmatic usage
You can also import and use the client in your own Node.js applications:

```javascript
const { VolcEngineClient } = require('volcengine-mcp-server');

const client = new VolcEngineClient('your_api_key');
const results = await client.webSearch({ query: 'test' });
```

## Getting Help

- Check the [README.md](README.md) for detailed documentation
- Review the [example-usage.md](example-usage.md) for more examples
- Make sure your API key is valid and has search permissions