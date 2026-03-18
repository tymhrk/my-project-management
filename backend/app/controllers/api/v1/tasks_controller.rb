module Api
  module V1
    class TasksController < Api::V1::BaseController
      before_action :set_project, only: %i[index create]
      before_action :set_task, only: %i[show update destroy]

      def index
        @tasks = @project.tasks.order(created_at: :desc)
        render json: @tasks
      end

      def show
        render json: @task
      end

      def create
        @task = @project.tasks.build(task_params)
        if @task.save
          render json: @task, status: :created
        else
          render json: @task.errors, status: :unprocessable_content
        end
      end

      def update
        if @task.update(task_params)
          render json: @task
        else
          render json: @task.errors, status: :unprocessable_content
        end
      end

      def destroy
        @task.destroy
        head :no_content
      end

      def bulk_create
        @project = Project.find(params[:project_id])

        attributes = build_bulk_task_attributes

        fast_insert_tasks(attributes)

        render json: { message: 'Successfully created tasks' }, status: :created
      rescue StandardError => e
        render_error(e.message)
      end

      private

      def set_project
        @project = Project.find(params[:project_id])
      end

      def set_task
        @task = Task.find(params[:id])
      end

      def task_params
        params.expect(task: %i[name description status])
      end

      def bulk_task_params
        params.permit(tasks: %i[name description])
      end

      def build_bulk_task_attributes
        params[:tasks].map do |task|
          task.permit(:name, :description).to_h.merge(
            project_id: @project.id,
            status: :todo,
            created_at: Time.current,
            updated_at: Time.current
          )
        end
      end

      def fast_insert_tasks(attributes)
        Task.transaction do
          Task.insert_all!(attributes)
        end
      end

      def render_error(message)
        render json: { error: message }, status: :unprocessable_content
      end
    end
  end
end
