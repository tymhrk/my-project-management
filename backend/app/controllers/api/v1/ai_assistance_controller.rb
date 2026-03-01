require 'net/http'
require 'uri'
require 'json'

module Api
  module V1
    class AiAssistanceController < ApplicationController
      def generate_tasks
        project_name = params[:project_name]
        api_key = ENV['GEMINI_API_KEY']

        if api_key.blank?
          render json: { error: "APIキーが未設定です" }, status: 500
          return
        end

        model_name  = "gemini-2.5-flash"
        uri = URI.parse("https://generativelanguage.googleapis.com/v1/models/#{model_name}:generateContent?key=#{api_key}")
        
        header = { 'Content-Type' => 'application/json' }
        body = {
          contents: [{
            parts: [{ text: "プロジェクト「#{project_name}」に必要な具体的なタスクを5つ、タスク名のみ改行区切りで出力してください。" }]
          }]
        }

        begin
          http = Net::HTTP.new(uri.host, uri.port)
          http.use_ssl = true
          http.read_timeout = 20

          request = Net::HTTP::Post.new(uri.request_uri, header)
          request.body = body.to_json

          response = http.request(request)
          result = JSON.parse(response.body)

          if response.code == "200"
            ai_text = result.dig("candidates", 0, "content", "parts", 0, "text") || ""
            tasks = ai_text.strip.split("\n").map { |t| t.gsub(/^[0-9*・.\-\s]+/, "").strip }.reject(&:empty?)
            logger.info "Generated tasks for project '#{project_name}': #{tasks.join(', ')}"
            render json: { tasks: tasks }
          else
            # ここでエラー内容をログに出す
            logger.error "Gemini API Error: #{response.body}"
            render json: { error: "AIエラー: #{result.dig('error', 'message')}" }, status: response.code.to_i
          end
        rescue => e
          render json: { error: "サーバーエラー: #{e.message}" }, status: 500
        end
      end
    end
  end
end