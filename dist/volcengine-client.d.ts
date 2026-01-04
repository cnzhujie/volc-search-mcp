import { WebSearchParams, ImageSearchParams, SearchResponse } from './types';
export declare class VolcEngineClient {
    private client;
    private apiKey;
    constructor(apiKey: string);
    webSearch(params: WebSearchParams): Promise<SearchResponse>;
    webSearchSummary(params: WebSearchParams): Promise<SearchResponse>;
    imageSearch(params: ImageSearchParams): Promise<SearchResponse>;
    validateApiKey(): boolean;
}
//# sourceMappingURL=volcengine-client.d.ts.map