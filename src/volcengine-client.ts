import axios, { AxiosInstance } from 'axios';
import {
  WebSearchParams,
  ImageSearchParams,
  SearchResponse,
  ErrorResponse
} from './types';

export class VolcEngineClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
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

  async webSearch(params: WebSearchParams): Promise<SearchResponse> {
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
      return response.data.Result;
    } catch (error: any) {
      if (error.response?.data?.Error) {
        const errorData: ErrorResponse = error.response.data.Error;
        throw new Error(`VolcEngine API Error ${errorData.Code}: ${errorData.Message}`);
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async webSearchSummary(params: WebSearchParams): Promise<SearchResponse> {
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
      NeedSummary: true, // Must be true for web_summary
      TimeRange: params.timeRange || '',
      QueryControl: {
        QueryRewrite: params.queryRewrite || false
      }
    };

    try {
      const response = await this.client.post('/search_api/web_search', requestBody);
      return response.data.Result;
    } catch (error: any) {
      if (error.response?.data?.Error) {
        const errorData: ErrorResponse = error.response.data.Error;
        throw new Error(`VolcEngine API Error ${errorData.Code}: ${errorData.Message}`);
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  async imageSearch(params: ImageSearchParams): Promise<SearchResponse> {
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
      return response.data.Result;
    } catch (error: any) {
      if (error.response?.data?.Error) {
        const errorData: ErrorResponse = error.response.data.Error;
        throw new Error(`VolcEngine API Error ${errorData.Code}: ${errorData.Message}`);
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  }

  validateApiKey(): boolean {
    return !!this.apiKey && this.apiKey.trim().length > 0;
  }
}