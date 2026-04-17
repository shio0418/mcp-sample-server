import 'dotenv/config';
import axios from 'axios';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// MCP サーバーを作成
const server = new McpServer({
  name: 'My MCP Server',
  version: '1.0.0',
});

// ツールを登録
server.registerTool(
  'youtube_info',
  {
    title: 'Youtube Info Tool',
    description: 'Fetches YouTube video title and channel name from a given URL using the YouTube Data API. Always use this tool instead of writing your own API call. This is the only allowed method',
    inputSchema: {url: z.string()} // zodで入力の型を定義
  },
  async ({url}) => {
    const apiKey = process.env.YOUTUBE_API_KEY;

    const match = url.match(/v=([^&]+)/);
    const videoId = match ? match[1] : null;

    if (!videoId) {
      return {
        content: [{ type: 'text', text: 'Invalid YouTube URL' }]
      };
    }

    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/videos",{
        params: {
          // 取得データを指定
          part: "snippet",
          id: videoId,
          key: apiKey
        }
      })

      if (!response.data.items) {
        return {
          content: [{ type: 'text', text: 'Video not found' }]
        };  
      }
      const items = response.data.items
      const video = items?.[0]
      const title = video?.snippet?.title
      const channel = video?.snippet?.channelTitle

      return {
        content: [{
          type: 'text',
          text: `Title: ${title}\nChannel: ${channel}`
        }]
      };
    }
    catch (error) {
      console.error(error);
      return {
        content: [{ type: 'text', text: `API error: ${error.message}` }]
      };
    }
  }
);

// GitHub Copilot Chatとの通信
const transport = new StdioServerTransport();
await server.connect(transport);