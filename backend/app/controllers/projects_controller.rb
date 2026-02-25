class ProjectsController < ApplicationController
  def index
    @projects = Project.all
    render json: @projects
  end

  def show
    @project = Project.find(params[:id])
    render json: @project
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Project not found" }, status: :not_found
  end

  def create
    @project = Project.new(project_params)
    if @project.save
      render json: @project, status: :created
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  def update
    project = Project.find(params[:id])
    if project.update(project_params)
      render json: project
    else
      render json: project.errors, status: :unprocessable_entity
    end
  end

  def destroy
    project = Project.find(params[:id])
    project.destroy
    render json: { message: "削除しました" }
  end

  private

  def project_params
    params.require(:project).permit(:name, :description)
  end
end