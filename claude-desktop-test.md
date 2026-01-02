# Claude Desktop Integration Test

This document demonstrates how to configure and test the VolcEngine MCP Server with Claude Desktop.

## 1. Configuration for Claude Desktop

Add the following to your Claude Desktop configuration file:

### On macOS:
```json
{
  "mcpServers": {
    "volcengine-search": {
      "command": "npx",
      "args": ["volcengine-search-mcp", "--api-key", "YOUR_VOLCENGINE_API_KEY"]
    }
  }
}
```

### On Windows:
```json
{
  "mcpServers": {
    "volcengine-search": {
      "command": "npx.cmd",
      "args": ["volcengine-search-mcp", "--api-key", "YOUR_VOLCENGINE_API_KEY"]
    }
  }
}
```

## 2. Test Commands

Once configured, you can use these commands in Claude:

### Web Search:
```
Search for information about artificial intelligence
```

### Image Search:
```
Find images of beautiful landscapes
```

## 3. Manual Test Script

Here's a script to manually test the MCP server:

```bash
#!/bin/bash

# Set your API key
export VOLCENGINE_API_KEY="your_api_key_here"

# Start the server
node dist/cli.js --verbose &

# Get the PID
SERVER_PID=$!

# Wait for server to start
sleep 2

# Test initialization
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"Test","version":"1.0.0"}}}' > /proc/$SERVER_PID/fd/0

# Wait and kill
sleep 2
kill $SERVER_PID
```

## 4. Expected Results

When properly configured with a valid API key:

1. **Server starts** and logs: `VolcEngine MCP Server running on stdio`
2. **Claude Desktop detects** the server and makes tools available
3. **Web search** returns relevant web page results
4. **Image search** returns image URLs and metadata

## 5. Troubleshooting

If you encounter issues:

1. **Check API key**: Ensure your VolcEngine API key is valid
2. **Check permissions**: Ensure npx can execute the package
3. **Check logs**: Use `--verbose` flag for detailed logs
4. **Test manually**: Use the test scripts above to verify functionality

## 6. Success Indicators

✅ Server starts without errors  
✅ MCP protocol initialization succeeds  
✅ Tools are listed correctly  
✅ API calls return valid responses (with proper API key)  
✅ Claude can access and use the search tools