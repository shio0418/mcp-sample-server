# mcp-sample

YouTube video のタイトルとチャンネル名を取得する MCP サーバーです。

## 必要なもの

- Node.js 18 以上
- YouTube Data API の API キー

## セットアップ

1. 依存パッケージをインストールします。

```bash
npm install
```

2. `.env` を作成して API キーを設定します。

```bash
YOUTUBE_API_KEY=your_api_key
```

## 起動

```bash
node index.js
```

## MCP 設定

GitHub Copilot Chat から使う場合は、`mcp.json` を以下のように設定します。

```json
{
  "github.copilot.chat.mcpServers": {
    "my-mcp-server": {
      "command": "node",
      "args": ["${workspaceFolder}/index.js"]
    }
  }
}
```

## 使い方

`youtube_info` ツールに YouTube の URL を渡すと、動画タイトルとチャンネル名を返します。
