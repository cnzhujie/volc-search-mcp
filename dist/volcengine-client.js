import axios from 'axios';
export class VolcEngineClient {
    client;
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: 'https://open.feedcoopapi.com',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            timeout: 30000
        });
    }
    async webSearch(params) {
        const requestBody = {
            Query: params.query,
            SearchType: 'web',
            Count: params.count || 10,
            Filter: {
                NeedContent: params.needContent || false,
                NeedUrl: params.needUrl || false,
                Sites: params.sites || '',
                BlockHosts: params.blockHosts || ''
            },
            NeedSummary: params.needSummary || false,
            TimeRange: params.timeRange || '',
            QueryControl: {
                QueryRewrite: params.queryRewrite || false
            }
        };
        try {
            const response = await this.client.post('/search_api/web_search', requestBody);
            const apiResult = response.data.Result;
            if (!apiResult) {
                return {
                    resultCount: 0,
                    webResults: [],
                    imageResults: [],
                    searchContext: { originQuery: params.query, searchType: 'web' },
                    timeCost: 0,
                    logId: '',
                    cardResults: [],
                    choices: [],
                    usage: undefined
                };
            }
            return {
                resultCount: apiResult.ResultCount || 0,
                webResults: (apiResult.WebResults || []).map(item => ({
                    id: item.Id || '',
                    sortId: item.SortId || 0,
                    title: item.Title || '',
                    siteName: item.SiteName,
                    url: item.Url,
                    snippet: item.Snippet || '',
                    summary: item.Summary,
                    content: item.Content,
                    publishTime: item.PublishTime,
                    logoUrl: item.LogoUrl,
                    rankScore: item.RankScore,
                    authInfoDes: item.AuthInfoDes || '',
                    authInfoLevel: item.AuthInfoLevel || 0,
                    ruyiInfo: item.RuyiInfo
                })),
                imageResults: (apiResult.ImageResults || []).map(item => ({
                    id: item.Id || '',
                    sortId: item.SortId || 0,
                    title: item.Title,
                    siteName: item.SiteName,
                    url: item.Url,
                    publishTime: item.PublishTime,
                    image: {
                        url: item.Image?.Url || '',
                        width: item.Image?.Width,
                        height: item.Image?.Height,
                        shape: item.Image?.Shape || ''
                    },
                    rankScore: item.RankScore
                })),
                searchContext: apiResult.SearchContext ? {
                    originQuery: apiResult.SearchContext.OriginQuery || params.query,
                    searchType: apiResult.SearchContext.SearchType || 'web'
                } : { originQuery: params.query, searchType: 'web' },
                timeCost: apiResult.TimeCost || 0,
                logId: apiResult.LogId || '',
                cardResults: apiResult.CardResults || [],
                choices: apiResult.Choices || [],
                usage: apiResult.Usage ? {
                    promptTokens: apiResult.Usage.PromptTokens || 0,
                    completionTokens: apiResult.Usage.CompletionTokens || 0,
                    totalTokens: apiResult.Usage.TotalTokens || 0,
                    searchTimeCost: apiResult.Usage.SearchTimeCost || 0,
                    firstTokenTimeCost: apiResult.Usage.FirstTokenTimeCost || 0,
                    totalTimeCost: apiResult.Usage.TotalTimeCost || 0
                } : undefined
            };
        }
        catch (error) {
            if (error.response?.data?.Error) {
                const errorData = error.response.data.Error;
                throw new Error(`VolcEngine API Error ${errorData.Code}: ${errorData.Message}`);
            }
            throw new Error(`Request failed: ${error.message}`);
        }
    }
    async webSearchSummary(params) {
        const requestBody = {
            Query: params.query,
            SearchType: 'web_summary',
            Count: params.count || 10,
            Filter: {
                NeedContent: params.needContent || false,
                NeedUrl: params.needUrl || false,
                Sites: params.sites || '',
                BlockHosts: params.blockHosts || ''
            },
            NeedSummary: true,
            TimeRange: params.timeRange || '',
            QueryControl: {
                QueryRewrite: params.queryRewrite || false
            }
        };
        try {
            const response = await this.client.post('/search_api/web_search', requestBody);
            const apiResult = response.data.Result;
            if (!apiResult) {
                return {
                    resultCount: 0,
                    webResults: [],
                    imageResults: [],
                    searchContext: { originQuery: params.query, searchType: 'web_summary' },
                    timeCost: 0,
                    logId: '',
                    cardResults: [],
                    choices: [],
                    usage: undefined
                };
            }
            return {
                resultCount: apiResult.ResultCount || 0,
                webResults: (apiResult.WebResults || []).map(item => ({
                    id: item.Id || '',
                    sortId: item.SortId || 0,
                    title: item.Title || '',
                    siteName: item.SiteName,
                    url: item.Url,
                    snippet: item.Snippet || '',
                    summary: item.Summary,
                    content: item.Content,
                    publishTime: item.PublishTime,
                    logoUrl: item.LogoUrl,
                    rankScore: item.RankScore,
                    authInfoDes: item.AuthInfoDes || '',
                    authInfoLevel: item.AuthInfoLevel || 0,
                    ruyiInfo: item.RuyiInfo
                })),
                imageResults: (apiResult.ImageResults || []).map(item => ({
                    id: item.Id || '',
                    sortId: item.SortId || 0,
                    title: item.Title,
                    siteName: item.SiteName,
                    url: item.Url,
                    publishTime: item.PublishTime,
                    image: {
                        url: item.Image?.Url || '',
                        width: item.Image?.Width,
                        height: item.Image?.Height,
                        shape: item.Image?.Shape || ''
                    },
                    rankScore: item.RankScore
                })),
                searchContext: apiResult.SearchContext ? {
                    originQuery: apiResult.SearchContext.OriginQuery || params.query,
                    searchType: apiResult.SearchContext.SearchType || 'web_summary'
                } : { originQuery: params.query, searchType: 'web_summary' },
                timeCost: apiResult.TimeCost || 0,
                logId: apiResult.LogId || '',
                cardResults: apiResult.CardResults || [],
                choices: apiResult.Choices || [],
                usage: apiResult.Usage ? {
                    promptTokens: apiResult.Usage.PromptTokens || 0,
                    completionTokens: apiResult.Usage.CompletionTokens || 0,
                    totalTokens: apiResult.Usage.TotalTokens || 0,
                    searchTimeCost: apiResult.Usage.SearchTimeCost || 0,
                    firstTokenTimeCost: apiResult.Usage.FirstTokenTimeCost || 0,
                    totalTimeCost: apiResult.Usage.TotalTimeCost || 0
                } : undefined
            };
        }
        catch (error) {
            if (error.response?.data?.Error) {
                const errorData = error.response.data.Error;
                throw new Error(`VolcEngine API Error ${errorData.Code}: ${errorData.Message}`);
            }
            throw new Error(`Request failed: ${error.message}`);
        }
    }
    async imageSearch(params) {
        const requestBody = {
            Query: params.query,
            SearchType: 'image',
            Count: params.count || 5,
            Filter: {
                ImageWidthMin: params.imageWidthMin,
                ImageHeightMin: params.imageHeightMin,
                ImageWidthMax: params.imageWidthMax,
                ImageHeightMax: params.imageHeightMax,
                ImageShapes: params.imageShapes || []
            },
            QueryControl: {
                QueryRewrite: params.queryRewrite || false
            }
        };
        try {
            const response = await this.client.post('/search_api/web_search', requestBody);
            const apiResult = response.data.Result;
            if (!apiResult) {
                return {
                    resultCount: 0,
                    webResults: [],
                    imageResults: [],
                    searchContext: { originQuery: params.query, searchType: 'image' },
                    timeCost: 0,
                    logId: '',
                    cardResults: [],
                    choices: [],
                    usage: undefined
                };
            }
            return {
                resultCount: apiResult.ResultCount || 0,
                webResults: (apiResult.WebResults || []).map(item => ({
                    id: item.Id || '',
                    sortId: item.SortId || 0,
                    title: item.Title || '',
                    siteName: item.SiteName,
                    url: item.Url,
                    snippet: item.Snippet || '',
                    summary: item.Summary,
                    content: item.Content,
                    publishTime: item.PublishTime,
                    logoUrl: item.LogoUrl,
                    rankScore: item.RankScore,
                    authInfoDes: item.AuthInfoDes || '',
                    authInfoLevel: item.AuthInfoLevel || 0,
                    ruyiInfo: item.RuyiInfo
                })),
                imageResults: (apiResult.ImageResults || []).map(item => ({
                    id: item.Id || '',
                    sortId: item.SortId || 0,
                    title: item.Title,
                    siteName: item.SiteName,
                    url: item.Url,
                    publishTime: item.PublishTime,
                    image: {
                        url: item.Image?.Url || '',
                        width: item.Image?.Width,
                        height: item.Image?.Height,
                        shape: item.Image?.Shape || ''
                    },
                    rankScore: item.RankScore
                })),
                searchContext: apiResult.SearchContext ? {
                    originQuery: apiResult.SearchContext.OriginQuery || params.query,
                    searchType: apiResult.SearchContext.SearchType || 'image'
                } : { originQuery: params.query, searchType: 'image' },
                timeCost: apiResult.TimeCost || 0,
                logId: apiResult.LogId || '',
                cardResults: apiResult.CardResults || [],
                choices: apiResult.Choices || [],
                usage: apiResult.Usage ? {
                    promptTokens: apiResult.Usage.PromptTokens || 0,
                    completionTokens: apiResult.Usage.CompletionTokens || 0,
                    totalTokens: apiResult.Usage.TotalTokens || 0,
                    searchTimeCost: apiResult.Usage.SearchTimeCost || 0,
                    firstTokenTimeCost: apiResult.Usage.FirstTokenTimeCost || 0,
                    totalTimeCost: apiResult.Usage.TotalTimeCost || 0
                } : undefined
            };
        }
        catch (error) {
            if (error.response?.data?.Error) {
                const errorData = error.response.data.Error;
                throw new Error(`VolcEngine API Error ${errorData.Code}: ${errorData.Message}`);
            }
            throw new Error(`Request failed: ${error.message}`);
        }
    }
    validateApiKey() {
        return !!this.apiKey && this.apiKey.trim().length > 0;
    }
}
//# sourceMappingURL=volcengine-client.js.map