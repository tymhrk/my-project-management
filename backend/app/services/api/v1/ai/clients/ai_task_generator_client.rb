module Api::V1::Ai::Clients
  class AiTaskGeneratorClient < BaseClient
    def generate(project_name)
      # 環境変数（.env）でモックに切替
      return mock_response if ENV["USE_AI_MOCK"] == "true"

      response = @client.chat(
        parameters: {
          model: ENV["AI_MODEL_NAME"] || "google/gemini-2.0-flash-001", 
          messages: [
            { role: "system", content: system_prompt },
            { role: "user", content: "Project: #{project_name}" }
          ],
          response_format: { type: "json_object" }
        }
      )

      JSON.parse(response.dig("choices", 0, "message", "content"))
    rescue => e
      Rails.logger.error "AI Generation Error: #{e.message}"
      { "tasks" => [] }
    end

    private

    def system_prompt
      "あなたは優秀なPMです。プロジェクト名から必要なタスクを5つ抽出し、以下のJSON形式で返してください。 { \"tasks\": [ { \"name\": \"...\", \"description\": \"...\" } ] }"
    end

    def mock_response
      {
        "tasks" => [
          { "name" => "【MOCK】環境構築", "description" => "Dockerコンテナのセットアップを行う" },
          { "name" => "【MOCK】DB設計", "description" => "ER図の作成とマイグレーションの実行" },
          { "name" => "【MOCK】API実装", "description" => "CRUD機能のコントローラー作成" },
          { "name" => "【MOCK】フロントエンド実装", "description" => "Next.jsでの画面作成" },
          { "name" => "【MOCK】デプロイ", "description" => "RenderまたはRailwayへのデプロイ" }
        ]
      }
    end
  end
end
