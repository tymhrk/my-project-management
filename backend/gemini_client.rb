module Ai
  module Clients
    class GeminiClient < BaseClient
      GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

      def initialize(api_key: ENV["GEMINI_API_KEY"])
        @api_key = api_key
      end

      def generate_tasks(project_name:)
        prompt = build_prompt(project_name)

        response = post(prompt)

        response # ← 生レスポンスをそのまま返す
      end

      private

      def build_prompt(project_name)
        <<~PROMPT
          You are a project manager.
          Given the following project name, generate a list of tasks in JSON format.

          Project name:
          #{project_name}

          Response format example:
          [
            { "title": "Design", "priority": "high" },
            { "title": "Implementation", "priority": "medium" }
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
