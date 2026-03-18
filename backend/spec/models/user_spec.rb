require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'バリデーション' do
    it '名前、メール、パスワードがあれば有効であること' do
      user = build(:user)
      expect(user).to be_valid
    end

    it '名前がない場合は無効であること' do
      user = build(:user, name: nil)
      user.valid?
      expect(user.errors[:name]).to include('を入力してください')
    end

    it 'メールアドレスが重複している場合は無効であること' do
      create(:user, email: 'same@example.com')
      user = build(:user, email: 'same@example.com')
      user.valid?
      expect(user.errors[:email]).to include('はすでに存在します')
    end
  end
end
