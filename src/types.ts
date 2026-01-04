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

// API原始响应类型
export interface ApiWebSearchResult {
  Id: string;
  SortId: number;
  Title: string;
  SiteName?: string;
  Url?: string;
  Snippet: string;
  Summary?: string;
  Content?: string;
  PublishTime?: string;
  LogoUrl?: string;
  RankScore?: number;
  AuthInfoDes: string;
  AuthInfoLevel: number;
  RuyiInfo?: any;
}

export interface ApiImageSearchResult {
  Id: string;
  SortId: number;
  Title?: string;
  SiteName?: string;
  Url?: string;
  PublishTime?: string;
  Image: {
    Url: string;
    Width?: number;
    Height?: number;
    Shape: string;
  };
  RankScore?: number;
}

export interface ApiSearchResponse {
  ResultCount: number;
  WebResults?: ApiWebSearchResult[];
  ImageResults?: ApiImageSearchResult[];
  SearchContext: {
    OriginQuery: string;
    SearchType: string;
  };
  TimeCost: number;
  LogId: string;
  CardResults?: any[];
  Choices?: any[];
  Usage?: {
    PromptTokens: number;
    CompletionTokens: number;
    TotalTokens: number;
    SearchTimeCost: number;
    FirstTokenTimeCost: number;
    TotalTimeCost: number;
  };
}