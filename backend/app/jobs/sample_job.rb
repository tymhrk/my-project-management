class SampleJob < ApplicationJob
  queue_as :default

  def perform(user_id)
    user = User.find(user_id)
    Rails.logger.debug { "--- 非同期ジョブ開始：#{user.name}さんの処理をしています ---" }

    sleep 5

    Rails.logger.debug '--- 非同期ジョブ完了！ ---'
  end
end
