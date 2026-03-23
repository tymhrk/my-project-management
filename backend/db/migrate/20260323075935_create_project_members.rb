class CreateProjectMembers < ActiveRecord::Migration[8.1]
  def change
    create_table :project_members, id: :uuid do |t|
      t.references :user, null: false, foreign_key: true, type: :uuid
      t.references :project, null: false, foreign_key: true, type: :uuid
      t.integer :role

      t.timestamps
    end
  end
end
