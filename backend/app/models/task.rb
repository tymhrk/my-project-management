class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true, length: { maximum: 50 }
  validates :description, length: { maximum: 200 }

  enum :status, { todo: 0, doing: 1, done: 2 }, default: :todo
end
