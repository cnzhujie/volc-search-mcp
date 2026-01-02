#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const mcp_server_js_1 = require("./mcp-server.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const program = new commander_1.Command();
program
    .name('volcengine-mcp')
    .description('MCP Server for VolcEngine Web Search and Image Search')
    .version('1.0.0')
    .option('-k, --api-key <key>', 'VolcEngine API Key (can also use VOLCENGINE_API_KEY env var)')
    .option('-p, --port <port>', 'Port for HTTP transport (not used for stdio)', '3000')
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
        const server = new mcp_server_js_1.VolcEngineMCPServer(apiKey);
        await server.run();
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