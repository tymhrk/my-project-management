FactoryBot.define do
  factory :task do
    name { '実装タスク' }
    description { 'エディタのセットアップをする' }
    status { 0 }
    association :project
  end
end
