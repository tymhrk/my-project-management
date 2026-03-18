require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'バリデーション' do
    it '名前があれば有効であること' do
      project = build(:project)
      expect(project).to be_valid
    end

    it '名前がない場合は無効であること' do
      project = build(:project, name: nil)
      project.valid?
      expect(project.errors[:name]).to include('を入力してください')
    end

    describe '名前の文字数制限' do
      it '名前が30文字以内なら有効であること' do
        project = build(:project, name: 'a' * 50)
        expect(project).to be_valid
      end

      it '名前が31文字以上なら無効であること' do
        project = build(:project, name: 'a' * 51)
        project.valid?
        expect(project.errors[:name]).to include('は50文字以内で入力してください')
      end
    end
  end
end
