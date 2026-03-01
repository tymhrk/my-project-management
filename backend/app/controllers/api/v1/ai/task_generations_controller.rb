module Api
  module V1
    module Ai
      class TaskGenerationsController < ApplicationController
        def create
          project = Project.find(params[:project_id])
          tasks = Ai::Clients::GeminiClient.new.generate_tasks(project_name: project.name)

          render json: { tasks: parse_response(tasks) }
        end

        private

        def parse_response(response)
          candidate = response["candidates"]&.first
          return [] unless candidate

          text = candidate.dig("content", "parts", 0, "text")
          return [] unless text

          cleaned = text.gsub(/\A```json\s*|\s*```?\z/, "")

          JSON.parse(cleaned)
        rescue JSON::ParserError
          []
        end
      end
    end
  end
end
