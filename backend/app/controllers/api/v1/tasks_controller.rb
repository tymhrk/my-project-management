class Api::V1::TasksController < ApplicationController
  # 1. フィルターの整理
  before_action :set_project, only: [:index, :create]
  before_action :set_task, only: [:show, :update, :destroy]

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
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :content, :status)
  end
end