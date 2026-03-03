class Task < ApplicationRecord
  belongs_to :project

  enum :status, { todo: 0, doing: 1, done: 2 }, default: :todo
end
