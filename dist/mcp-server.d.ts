export declare class VolcEngineMCPServer {
    private server;
    private client;
    constructor(apiKey: string);
    private setupToolHandlers;
    private getTools;
    private handleWebSearch;
    private handleImageSearch;
    private setupErrorHandlers;
    run(mode?: 'stdio' | 'sse', port?: number): Promise<void>;
}
//# sourceMappingURL=mcp-server.d.ts.map