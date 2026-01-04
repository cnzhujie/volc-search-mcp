import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { VolcEngineClient } from './volcengine-client.js';
import { WebSearchParams, ImageSearchParams } from './types.js';

export class VolcEngineMCPServer {
  private server: Server;
  private client: VolcEngineClient;

  constructor(apiKey: string) {
    this.client = new VolcEngineClient(apiKey);
    
    this.server = new Server(
      {
        name: 'volcengine-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupErrorHandlers();
  }

  private setupToolHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: this.getTools(),
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'web_search':
            return await this.handleWebSearch(args as unknown as WebSearchParams);
          
          case 'image_search':
            return await this.handleImageSearch(args as unknown as ImageSearchParams);
          
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error: any) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private getTools(): Tool[] {
    return [
      {
        name: 'web_search',
        description: 'Search web pages using VolcEngine search API',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (1-100 characters)',
            },
            count: {
              type: 'number',
              description: 'Number of results (1-50, default: 10)',
              minimum: 1,
              maximum: 50,
            },
            needContent: {
              type: 'boolean',
              description: 'Return only results with content',
            },
            needUrl: {
              type: 'boolean',
              description: 'Return only results with URL',
            },
            sites: {
              type: 'string',
              description: 'Specific sites to search (pipe-separated)',
            },
            blockHosts: {
              type: 'string',
              description: 'Sites to block (pipe-separated)',
            },
            needSummary: {
              type: 'boolean',
              description: 'Include precise summary',
            },
            timeRange: {
              type: 'string',
              description: 'Time range: OneDay, OneWeek, OneMonth, OneYear, or date range like "2024-12-30..2025-12-30"',
            },
            queryRewrite: {
              type: 'boolean',
              description: 'Enable query rewriting',
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'image_search',
        description: 'Search images using VolcEngine search API',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query (1-100 characters)',
            },
            count: {
              type: 'number',
              description: 'Number of results (1-5, default: 5)',
              minimum: 1,
              maximum: 5,
            },
            imageWidthMin: {
              type: 'number',
              description: 'Minimum image width',
            },
            imageHeightMin: {
              type: 'number',
              description: 'Minimum image height',
            },
            imageWidthMax: {
              type: 'number',
              description: 'Maximum image width',
            },
            imageHeightMax: {
              type: 'number',
              description: 'Maximum image height',
            },
            imageShapes: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['横长方形', '竖长方形', '方形'],
              },
              description: 'Allowed image shapes',
            },
            queryRewrite: {
              type: 'boolean',
              description: 'Enable query rewriting',
            },
          },
          required: ['query'],
        },
      },
    ];
  }

  private async handleWebSearch(params: WebSearchParams): Promise<any> {
    if (!params.query || params.query.trim().length === 0) {
      throw new Error('Query is required');
    }

    if (params.query.length > 100) {
      throw new Error('Query must be 100 characters or less');
    }

    const result = await this.client.webSearch(params);
    
    const formattedResults = result.webResults?.map(item => ({
      title: item.title,
      site: item.siteName,
      url: item.url,
      snippet: item.snippet,
      summary: item.summary,
      publishTime: item.publishTime,
      authority: `${item.authInfoDes} (Level ${item.authInfoLevel})`,
      score: item.rankScore ? Math.round(item.rankScore * 100) / 100 : undefined,
    })) || [];

    return {
      content: [
        {
          type: 'text',
          text: `Found ${result.resultCount} results for "${params.query}":\n\n` +
            formattedResults.map((item, index) => 
              `${index + 1}. **${item.title}**\n` +
              `   Site: ${item.site || 'N/A'}\n` +
              `   URL: ${item.url || 'N/A'}\n` +
              `   Snippet: ${item.snippet}\n` +
              (item.summary ? `   Summary: ${item.summary}\n` : '') +
              (item.publishTime ? `   Published: ${item.publishTime}\n` : '') +
              `   Authority: ${item.authority}\n` +
              (item.score ? `   Score: ${item.score}\n` : '')
            ).join('\n')
        },
      ],
    };
  }

  private async handleImageSearch(params: ImageSearchParams): Promise<any> {
    if (!params.query || params.query.trim().length === 0) {
      throw new Error('Query is required');
    }

    if (params.query.length > 100) {
      throw new Error('Query must be 100 characters or less');
    }

    const result = await this.client.imageSearch(params);
    
    const formattedResults = result.imageResults?.map(item => ({
      title: item.title,
      site: item.siteName,
      url: item.url,
      imageUrl: item.image.url,
      width: item.image.width,
      height: item.image.height,
      shape: item.image.shape,
      publishTime: item.publishTime,
      score: item.rankScore ? Math.round(item.rankScore * 100) / 100 : undefined,
    })) || [];

    return {
      content: [
        {
          type: 'text',
          text: `Found ${result.resultCount} images for "${params.query}":\n\n` +
            formattedResults.map((item, index) => 
              `${index + 1}. **${item.title || 'Untitled'}**\n` +
              `   Site: ${item.site || 'N/A'}\n` +
              `   URL: ${item.url || 'N/A'}\n` +
              `   Image: ${item.imageUrl}\n` +
              (item.width && item.height ? `   Dimensions: ${item.width}×${item.height}\n` : '') +
              `   Shape: ${item.shape}\n` +
              (item.publishTime ? `   Published: ${item.publishTime}\n` : '') +
              (item.score ? `   Score: ${item.score}\n` : '')
            ).join('\n')
        },
      ],
    };
  }

  private setupErrorHandlers(): void {
    this.server.onerror = (error) => {
      console.error('[MCP Server Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('VolcEngine MCP Server running on stdio');
  }
}