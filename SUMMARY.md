# VolcEngine MCP Server - Complete Package

## Overview

A complete MCP (Model Context Protocol) Server implementation for VolcEngine's Web Search and Image Search APIs. This package allows AI assistants like Claude to perform web searches and image searches through a standardized interface.

## What's Included

### 1. Core Components
- **MCP Server** (`src/mcp-server.ts`): Main server implementation with tool definitions
- **VolcEngine Client** (`src/volcengine-client.ts`): API client for VolcEngine search endpoints
- **Type Definitions** (`src/types.ts`): TypeScript interfaces for all data structures
- **CLI Interface** (`src/cli.ts`): Command-line interface for running the server

### 2. Build System
- **TypeScript Configuration** (`tsconfig.json`): Strict TypeScript settings
- **Package Configuration** (`package.json`): Complete npm package definition
- **Build Scripts**: `npm run build`, `npm run dev`, `npm start`

### 3. Documentation
- **README.md**: Main documentation with installation and usage instructions
- **example-usage.md**: Detailed examples and configuration guides
- **npx-example.md**: Specific instructions for npx usage
- **SUMMARY.md**: This overview document

### 4. Utility Scripts
- **verify.js**: Package verification script
- **publish.sh**: Automated publishing script
- **test-example.js**: Example usage test

## Key Features

### 1. Two Search Tools
- **web_search**: Full-featured web search with filtering options
- **image_search**: Image search with size and shape filtering

### 2. Easy Deployment
- **npx support**: Run without installation: `npx volcengine-mcp-server`
- **Global installation**: `npm install -g volcengine-mcp-server`
- **Environment variables**: Support for `VOLCENGINE_API_KEY`

### 3. Type Safety
- Full TypeScript support
- Comprehensive type definitions
- Strict compilation settings

### 4. Error Handling
- Proper error responses
- API error code translation
- Graceful shutdown

## Usage Examples

### Quick Start
```bash
# Using npx (no installation)
npx volcengine-mcp-server --api-key YOUR_KEY

# Or with environment variable
export VOLCENGINE_API_KEY=your_key
npx volcengine-mcp-server
```

### Claude Desktop Integration
```json
{
  "mcpServers": {
    "volcengine": {
      "command": "npx",
      "args": ["volcengine-mcp-server", "--api-key", "YOUR_KEY"]
    }
  }
}
```

### Programmatic Usage
```javascript
const { VolcEngineClient } = require('volcengine-mcp-server');
const client = new VolcEngineClient('your_key');
const results = await client.webSearch({ query: 'test' });
```

## Development

### Building
```bash
npm install
npm run build
```

### Development Mode
```bash
npm run dev  # Watch mode for TypeScript compilation
```

### Testing
```bash
node test-example.js
```

## Publishing

### 1. Verify Package
```bash
node verify.js
```

### 2. Publish
```bash
./publish.sh
# Or manually
npm publish --access public
```

## File Structure

```
volcengine-mcp-server/
├── src/
│   ├── types.ts          # Type definitions
│   ├── volcengine-client.ts  # API client
│   ├── mcp-server.ts     # MCP server implementation
│   ├── cli.ts            # CLI interface
│   └── index.ts          # Main exports
├── dist/                 # Compiled JavaScript
├── package.json         # npm package configuration
├── tsconfig.json        # TypeScript configuration
├── README.md           # Main documentation
├── example-usage.md    # Usage examples
├── npx-example.md      # npx-specific instructions
├── SUMMARY.md          # This overview
├── verify.js           # Verification script
├── publish.sh          # Publishing script
└── test-example.js     # Test example
```

## Dependencies

### Runtime
- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `axios`: HTTP client for API requests
- `commander`: CLI framework
- `dotenv`: Environment variable support

### Development
- `typescript`: TypeScript compiler
- `@types/node`: Node.js type definitions

## Requirements

- Node.js 18 or higher
- VolcEngine API Key
- Internet connection

## Support

For issues, questions, or contributions:
1. Check the documentation
2. Review the example files
3. Test with the verification script

## License

MIT License - See package.json for details