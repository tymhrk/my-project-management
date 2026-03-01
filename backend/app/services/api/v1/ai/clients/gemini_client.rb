module Api
  module V1
    module Ai
      module Clients
        class GeminiClient < BaseClient
          GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"

          def initialize(api_key: ENV["GEMINI_API_KEY"])
            @api_key = api_key
          end

          def generate_tasks(project_name:)
            prompt = build_prompt(project_name)

            response = post(prompt)

            response
          end

          private

          def build_prompt(project_name)
            <<~PROMPT
              あなたは経験豊富なプロジェクトマネージャーです。
              以下のプロジェクト名をもとに、実行可能なタスク一覧を作成してください。

              制約条件:
              - 出力は **JSON配列のみ** にしてください
              - 説明文・補足文・コードブロック（```）は含めないでください
              - 各タスクは以下の2つのキーを必ず持つオブジェクトにしてください
                - title: タスク名（文字列）
                - priority: 優先度（"high" / "medium" / "low" のいずれか）
              - priority はプロジェクト全体の進行順を考慮して現実的に設定してください

              プロジェクト名:
              #{project_name}

              出力形式:
              [
                { "title": "要件定義", "priority": "high" },
                { "title": "基本設計", "priority": "high" },
                { "title": "実装", "priority": "medium" }
              ]
            PROMPT
          end

          def post(prompt)
            conn = Faraday.new(url: GEMINI_ENDPOINT) do |f|
              f.request :json
              f.response :json
            end

            response = conn.post do |req|
              req.params["key"] = @api_key
              req.body = {
                contents: [
                  {
                    parts: [
                      { text: prompt }
                    ]
                  }
                ]
              }
            end

            response.body
          end
        end
      end
    end
  end
end