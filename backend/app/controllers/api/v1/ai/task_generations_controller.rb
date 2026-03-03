module Api::V1
  class Ai::TaskGenerationsController < Api::V1::BaseController
    def create
      project = Project.find(params[:project_id])

      generator = Ai::Clients::AiTaskGeneratorClient.new
      suggested_tasks = generator.generate(project.name)

      if suggested_tasks.blank?
        render json: { error: "Failed to generate tasks" }, status: :service_unavailable
      else
        render json: suggested_tasks
      end
    rescue => e
      Rails.logger.error "TaskGenerationsController Error: #{e.message}"
      render json: { error: "Internal server error" }, status: :internal_server_error
    end
  end
end
