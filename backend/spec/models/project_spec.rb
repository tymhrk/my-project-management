require 'rails_helper'

RSpec.describe Project, type: :model do
  # 正常系の確認
  it '名前と説明があれば有効であること' do
    project = Project.new(name: 'Test Project', description: 'This is a description')
    expect(project).to be_valid
  end

  describe 'バリデーションのテスト' do
    describe 'name' do
      it '名前がなければ無効であること' do
        project = Project.new(name: nil)
        project.valid?
        # I18n.t で ja.yml の設定を読み込む
        expect(project.errors[:name]).to include(I18n.t('errors.messages.blank'))
      end

      it '名前が50文字以下であれば有効であること' do
        project = Project.new(name: 'a' * 50)
        expect(project).to be_valid
      end

      it '名前が51文字以上であれば無効であること' do
        project = Project.new(name: 'a' * 51)
        project.valid?
        expect(project.errors[:name]).to include(I18n.t('errors.messages.too_long', count: 50))
      end
    end

    describe 'description' do
      it '説明が200文字以下であれば有効であること' do
        project = Project.new(name: 'Test', description: 'a' * 200)
        expect(project).to be_valid
      end

      it '説明が201文字以上であれば無効であること' do
        project = Project.new(name: 'Test', description: 'a' * 201)
        project.valid?
        expect(project.errors[:description]).to include(I18n.t('errors.messages.too_long', count: 200))
      end
    end

    it 'タスクの数を正しくカウントできること' do
      project = Project.create!(name: 'Test')
      project.tasks.create!(name: 'Task 1')
      expect(project.tasks_count).to eq(1)
    end
  end
end
