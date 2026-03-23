class User < ApplicationRecord
  has_one_attached :avatar
  has_many :project_members, dependent: :destroy
  has_many :projects, through: :project_members
  has_many :assigned_tasks, class_name: 'Task', foreign_key: 'user_id'

  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :name, presence: true

  def task_counts
    counts = assigned_tasks.group(:status).count
    
    {
      todo: counts["todo"] || 0,
      doing: counts["doing"] || 0,
      done: counts["done"] || 0
    }
  end
end
