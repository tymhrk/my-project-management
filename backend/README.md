# Project Management API (Backend)

プロジェクト管理ツールのバックエンド API サーバーです。  
フロントエンド（Next.js）から利用されることを前提に、Rails を API モードで構成しています。

---

## 技術スタック

- Ruby: 3.4.2
- Rails: 8.1.2（API only）
- Database: PostgreSQL 16
- Container: Docker / Docker Compose
- AI API: Gemini API（将来的に OpenAI API 対応予定）

---

## 設計方針

### API ファースト

- Rails は `--api` モードで構築
- View / Helper / Asset は使用しない
- JSON API 専用構成

### 責務分離

- Controller: HTTP I/O のみ
- Service / Client: ビジネスロジック・外部 API 呼び出し
- 将来的な AI プロバイダ追加を考慮した構成

---

## 主な機能

### プロジェクト管理

- プロジェクト一覧取得
- 作成 / 更新 / 削除

### タスク管理

- プロジェクト配下のタスク CRUD
- 優先度（priority）管理

### AI タスク生成

- プロジェクト名を元に AI がタスク案を生成
- 現在は Gemini API を利用
- OpenAI API への切り替えを想定した設計

---

## 主な機能

### プロジェクト管理

- 一覧表示
- 作成 / 編集 / 削除

### タスク管理

- プロジェクト配下のタスク CRUD
- 優先度表示

### AI タスク提案

- プロジェクト詳細画面から AI を実行
- AI が生成したタスク案をモーダルで表示
- ユーザーが内容を確認した上で採用可能

---

## AI 機能の考え方

- AI は「決定」ではなく「提案」
- ユーザーが最終判断する UI を重視
- バックエンド API に依存しない構成
