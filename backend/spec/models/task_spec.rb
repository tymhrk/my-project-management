require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'バリデーション' do
    it '全ての属性が揃っていれば有効であること' do
      task = build(:task)
      expect(task).to be_valid
    end

    it '名前がない場合は無効であること' do
      task = build(:task, name: nil)
      task.valid?
      expect(task.errors[:name]).to include('を入力してください')
    end

    it 'プロジェクトに紐付いていない場合は無効であること' do
      task = build(:task, project: nil)
      task.valid?
      expect(task.errors[:project]).to include('を入力してください')
    end

    describe '名前の文字数制限' do
      it '名前が50文字以内なら有効であること' do
        task = build(:task, name: 'a' * 50)
        expect(task).to be_valid
      end

      it '名前が51文字以上なら無効であること' do
        task = build(:task, name: 'a' * 51)
        task.valid?
        expect(task.errors[:name]).to include('は50文字以内で入力してください')
      end
    end
  end

  describe '説明文の文字数制限' do
    it '説明文が200文字以内なら有効であること' do
      task = build(:task, description: 'い' * 200)
      expect(task).to be_valid
    end

    it '説明文が201文字以上なら無効であること' do
      task = build(:task, description: 'い' * 201)
      task.valid?
      expect(task.errors[:description]).to include('は200文字以内で入力してください')
    end
  end

  describe 'ステータス' do
    it 'デフォルト値が todo であること' do
      task = create(:task)
      expect(task.status).to eq 'todo'
    end
  end
end
