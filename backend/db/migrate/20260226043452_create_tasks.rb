class CreateTasks < ActiveRecord::Migration[8.1]
  def change
    create_table :tasks, id: :uuid do |t|
      t.string :name, null: false
      t.text :description
      t.integer :status, default: 0
      t.references :project, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
