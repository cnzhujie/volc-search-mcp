# Installation Guide

## Quick Installation

### Option 1: Use with npx (Recommended - No Installation)
```bash
# Run directly without installing
npx volcengine-mcp-server --api-key YOUR_API_KEY
```

### Option 2: Global Installation
```bash
# Install globally
npm install -g volcengine-mcp-server

# Then run from anywhere
volcengine-mcp --api-key YOUR_API_KEY
```

### Option 3: Local Installation
```bash
# Install in your project
npm install volcengine-mcp-server

# Use programmatically
const { VolcEngineClient } = require('volcengine-mcp-server');
```

## Step-by-Step Setup

### 1. Get Your API Key

1. Visit [VolcEngine Console](https://console.volcengine.com/ask-echo/api-key)
2. Login with your account
3. Navigate to: **联网问答智能体** → **APIKey 管理**
4. Click on **融合信息搜索** tab
5. Click **创建API Key** button
6. Give it a name and save the key

### 2. Test the Installation

```bash
# Test with help command
npx volcengine-mcp-server --help

# Expected output:
# Usage: volcengine-mcp [options]
# MCP Server for VolcEngine Web Search and Image Search
# Options:
#   -V, --version        output the version number
#   -k, --api-key <key>  VolcEngine API Key...
#   -p, --port <port>    Port for HTTP transport...
#   -v, --verbose        Enable verbose logging
#   -h, --help           display help for command
```

### 3. Run the Server

```bash
# Method A: Environment variable
export VOLCENGINE_API_KEY=your_key_here
npx volcengine-mcp-server

# Method B: Command line argument
npx volcengine-mcp-server --api-key your_key_here

# Method C: With verbose logging
npx volcengine-mcp-server --api-key your_key_here --verbose
```

## Integration with AI Assistants

### Claude Desktop

1. Open Claude Desktop
2. Go to Settings → Developer
3. Edit the configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

4. Add this configuration:
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

5. Restart Claude Desktop

### Other MCP Clients

The server uses stdio transport, so it works with any MCP-compatible client:

```bash
# The server communicates via stdin/stdout
# No HTTP server is needed for MCP protocol
```

## Verification

After installation, verify everything works:

```bash
# Run the verification script
node verify.js

# Expected output should show all checks passing
```

## Troubleshooting

### Common Issues

#### 1. "API Key is required" error
**Solution:**
```bash
# Make sure you've set the API key
echo $VOLCENGINE_API_KEY  # Should show your key

# Or use the command line option
npx volcengine-mcp-server --api-key $(cat ~/.volcengine-key)
```

#### 2. "Command not found" (npx)
**Solution:**
```bash
# Update npm
npm install -g npm

# Or use Node.js directly
node node_modules/.bin/volcengine-mcp-server --api-key YOUR_KEY
```

#### 3. Permission errors
**Solution:**
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm

# Or use a node version manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

#### 4. Network/API errors
**Solution:**
```bash
# Test API connectivity
curl -H "Authorization: Bearer YOUR_KEY" \
  https://open.feedcoopapi.com/search_api/web_search \
  -d '{"Query":"test","SearchType":"web"}' \
  -H "Content-Type: application/json"

# Check if the service is available in your region
```

## Updating

### Update with npx
```bash
# npx always uses the latest version
npx volcengine-mcp-server@latest --api-key YOUR_KEY
```

### Update global installation
```bash
npm update -g volcengine-mcp-server
```

### Update local installation
```bash
npm update volcengine-mcp-server
```

## Uninstallation

### Remove global installation
```bash
npm uninstall -g volcengine-mcp-server
```

### Remove local installation
```bash
npm uninstall volcengine-mcp-server
```

## Support

If you encounter issues:

1. Check the error message
2. Verify your API key is valid
3. Ensure Node.js version is 18+
4. Check internet connectivity
5. Review the [README.md](README.md) for more details

## Next Steps

After successful installation:
1. Test with Claude Desktop integration
2. Try different search queries
3. Experiment with filtering options
4. Review the example usage files