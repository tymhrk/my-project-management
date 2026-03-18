module Api
  module V1
    class ProjectsController < Api::V1::BaseController
      def index
        @projects = Project.order(created_at: :desc)
        render json: @projects.as_json(methods: :tasks_count)
      end

      def show
        @project = Project.find(params[:id])
        render json: @project
      rescue ActiveRecord::RecordNotFound
        render json: { error: 'Project not found' }, status: :not_found
      end

      def create
        @project = Project.new(project_params)
        if @project.save
          render json: @project, status: :created
        else
          render json: @project.errors, status: :unprocessable_content
        end
      end

      def update
        project = Project.find(params[:id])
        if project.update(project_params)
          head :no_content
        else
          render json: { errors: project.errors.full_messages }, status: :unprocessable_content
        end
      end

      def destroy
        project = Project.find(params[:id])
        project.destroy
        head :no_content
      end

      private

      def project_params
        params.expect(project: %i[name description])
      end
    end
  end
end
