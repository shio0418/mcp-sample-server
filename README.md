# mcp-sample

YouTube video のタイトルとチャンネル名を取得する MCP サーバーです。

## ⚠️ Known Issue / 現在の挙動

現状、MCPサーバー自体は正常に起動し、registerTool も成功しているログが確認できるが、
GitHub Copilot Chat 上でツールが利用可能一覧に表示されない場合がある。

#### 観測されている挙動
- MCPサーバーは正常に起動する
- youtube_info の登録ログは出力される
- しかし Copilot Chat 側でツールが表示されない
- 接続後に MCP クライアントが切断されるログが確認される場合がある

#### 期待される状態
Copilot Chat のツール一覧に youtube_info が表示される
youtube_info(url) が実行可能になる

#### 補足
この問題はコード実装ではなく、MCP クライアント（Copilot）との接続・認識レイヤーの問題の可能性がある。

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
