#!/usr/bin/env node
import { Command } from 'commander';
import { VolcEngineMCPServer } from './mcp-server.js';
import dotenv from 'dotenv';
dotenv.config();
const program = new Command();
program
    .name('volcengine-search-mcp')
    .description('MCP Server for VolcEngine Web Search and Image Search')
    .version('1.0.0')
    .option('-k, --api-key <key>', 'VolcEngine API Key (can also use VOLCENGINE_API_KEY env var)')
    .option('-m, --mode <mode>', 'Server mode: stdio or sse', 'stdio')
    .option('-p, --port <port>', 'Port for SSE transport (not used for stdio)', '3000')
    .option('-v, --verbose', 'Enable verbose logging')
    .action(async (options) => {
    try {
        const apiKey = options.apiKey || process.env.VOLCENGINE_API_KEY;
        if (!apiKey) {
            console.error('Error: API Key is required');
            console.error('You can provide it via:');
            console.error('  - --api-key option');
            console.error('  - VOLCENGINE_API_KEY environment variable');
            console.error('\nTo get an API Key:');
            console.error('1. Go to https://console.volcengine.com/ask-echo/api-key');
            console.error('2. Navigate to "联网问答智能体-APIKey 管理"');
            console.error('3. Click "融合信息搜索" and create an API Key');
            process.exit(1);
        }
        if (options.verbose) {
            console.error('Starting VolcEngine MCP Server...');
            console.error(`API Key: ${apiKey.substring(0, 8)}...`);
        }
        const mode = options.mode || process.env.VOLCENGINE_MODE || 'stdio';
        const port = parseInt(options.port) || parseInt(process.env.VOLCENGINE_PORT || '3000');
        const server = new VolcEngineMCPServer(apiKey);
        await server.run(mode, port);
    }
    catch (error) {
        console.error('Failed to start MCP server:', error.message);
        if (options.verbose) {
            console.error(error.stack);
        }
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=cli.js.map