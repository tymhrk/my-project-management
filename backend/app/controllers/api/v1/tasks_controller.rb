class Api::V1::TasksController < Api::V1::BaseController
  # 1. フィルターの整理
  before_action :set_project, only: [ :index, :create ]
  before_action :set_task, only: [ :show, :update, :destroy ]

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

  def bulk_create
    project = Project.find(params[:project_id])

    safe_tasks = bulk_task_params[:tasks]

    if safe_tasks.blank?
      return render json: { error: "登録するタスクデータがありません" }, status: :bad_request
    end

    task_attributes = safe_tasks.map do |t|
      {
        project_id: project.id,
        name: t[:name],
        description: t[:description],
        created_at: Time.current,
        updated_at: Time.current
      }
    end

    Task.insert_all!(task_attributes)

    render json: { message: "#{task_attributes.size}件のタスクを登録しました" }, status: :created
  rescue ActiveRecord::RecordNotFound
    render json: { error: "プロジェクトが見つかりません" }, status: :not_found
  rescue => e
    logger.error "Bulk Create Error: #{e.message}\n#{e.backtrace.join("\n")}"
    render json: { error: "サーバー内部エラーが発生しました" }, status: :internal_server_error
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :status)
  end

  def bulk_task_params
    params.permit(tasks: [ :name, :description ])
  end
end
