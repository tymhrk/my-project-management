# Project Management App (Frontend)

プロジェクト管理ツールのフロントエンドアプリケーションです。  
モダンフロントエンドの実務構成を意識し、Next.js(App Router) を採用しています。

---

## 技術スタック

- TypeScript: 5.x
- React: 19.x
- Next.js: 16.x（App Router）
- Styling: CSS Modules
- API 通信: Fetch Wrapper
- Container: Docker / Devcontainer

---

## 設計方針

### App Router 前提設計

- Server Component / Client Component を明確に分離
- データ取得は Server 側
- ユーザー操作は Client Component に限定

### 構成の見通しを重視

- pages.tsx の肥大化を避ける
- UI は components に集約
- ロジックは hooks / lib に切り出し
