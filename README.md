# Project Management System (Monorepo)

モダンな技術スタックを用いた、AI 連携型のプロジェクト管理アプリケーション。
フロントエンドとバックエンドを疎結合に設計し、拡張性と保守性を重視したアーキテクチャを採用しています。

## 🚀 アピールポイント

- **モダンなハイブリッド構成**: Next.js (App Router) によるサーバーサイドレンダリングと、API モードの Rails を組み合わせた堅牢な構成。
- **拡張性を考慮した設計**: 将来的な OpenAI API への切り替えやプロバイダ追加を容易にするため、ロジックを Service 層に分離。
- **AI 連携 UX**: AI によるタスク提案を「提案」として扱い、ユーザーが最終判断する柔軟な UI 設計。
- **コンテナ技術の活用**: Docker による開発環境の標準化と、ローカル/本番環境の差異を最小限に抑える環境構築。

## 🛠 技術スタック

### Backend (Rails API)

- **Framework**: Ruby on Rails 8.1.2 (API mode)
- **Language**: Ruby 3.4.2
- **Database**: PostgreSQL 16
- **AI Integration**: Gemini API (Interface abstraction)

### Frontend (Next.js)

- **Framework**: Next.js 16.x (App Router)
- **Language**: TypeScript 5.x
- **Library**: React 19.x
- **Styling**: CSS Modules

## 🏗 アーキテクチャ設計

### バックエンド：責務の明確化

- **Controller**: HTTP I/O の処理のみに集中。
- **Service/Client Layer**: ビジネスロジックと外部 API 通信を切り出し。API プロバイダの差し替えが容易な構成。

### フロントエンド：App Router の最適化

- **Server/Client Separation**: サーバーコンポーネントでのデータ取得と、クライアントコンポーネントでのインタラクティブな操作を分離し、パフォーマンスを最適化。
- **Modularization**: UI は `components`、ロジックは `hooks` / `lib` に分離し、コードの肥大化を防ぐ設計。

## 💡 今後の拡張性・展望

- **マルチ LLM 対応**: ユーザーが設定から AI プロバイダ (Gemini / OpenAI) を選択可能にする機能。
- **認証基盤の強化**: JWT またはセッションベースの認証機能の実装。
- **リアルタイム通知**: WebSocket 等を用いたタスク更新の即時反映。

## 🔧 開発環境の工夫

本プロジェクトでは Docker とローカル開発環境の併用において、環境変数の優先順位（`.env` vs `.env.development.local`）をシンボリックリンクを用いて制御し、環境ごとの DB 接続先を自動切り替えできるハイブリッド構成を採用しています。
