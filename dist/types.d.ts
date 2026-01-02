export interface WebSearchParams {
    query: string;
    count?: number;
    needContent?: boolean;
    needUrl?: boolean;
    sites?: string;
    blockHosts?: string;
    needSummary?: boolean;
    timeRange?: 'OneDay' | 'OneWeek' | 'OneMonth' | 'OneYear' | string;
    queryRewrite?: boolean;
}
export interface ImageSearchParams {
    query: string;
    count?: number;
    imageWidthMin?: number;
    imageHeightMin?: number;
    imageWidthMax?: number;
    imageHeightMax?: number;
    imageShapes?: ('横长方形' | '竖长方形' | '方形')[];
    queryRewrite?: boolean;
}
export interface WebSearchResult {
    id: string;
    sortId: number;
    title: string;
    siteName?: string;
    url?: string;
    snippet: string;
    summary?: string;
    content?: string;
    publishTime?: string;
    logoUrl?: string;
    rankScore?: number;
    authInfoDes: string;
    authInfoLevel: number;
    ruyiInfo?: any;
}
export interface ImageSearchResult {
    id: string;
    sortId: number;
    title?: string;
    siteName?: string;
    url?: string;
    publishTime?: string;
    image: {
        url: string;
        width?: number;
        height?: number;
        shape: string;
    };
    rankScore?: number;
}
export interface SearchResponse {
    resultCount: number;
    webResults?: WebSearchResult[];
    imageResults?: ImageSearchResult[];
    searchContext: {
        originQuery: string;
        searchType: string;
    };
    timeCost: number;
    logId: string;
    cardResults?: any[];
    choices?: any[];
    usage?: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        searchTimeCost: number;
        firstTokenTimeCost: number;
        totalTimeCost: number;
    };
}
export interface ErrorResponse {
    Code: string;
    Message: string;
}
//# sourceMappingURL=types.d.ts.map