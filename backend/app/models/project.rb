class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :project_members, dependent: :destroy
  has_many :users, through: :project_members

  validates :name, presence: true, length: { maximum: 50 }
  validates :description, length: { maximum: 200 }

  delegate :count, to: :tasks, prefix: true
end
