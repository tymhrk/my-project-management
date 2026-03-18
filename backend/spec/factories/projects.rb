FactoryBot.define do
  factory :project do
    name { '新規開発プロジェクト' }
    description { 'プロジェクトの詳細説明です。' }
    # association :user
  end
end
