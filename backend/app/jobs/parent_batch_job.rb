class ParentBatchJob < ApplicationJob
  queue_as :default

  def perform
    # 1000件ずつに切り分けてループ
    # find_in_batches は「モデルの配列」ではなく「IDの配列」を扱うのに便利
    User.find_in_batches(batch_size: 1000) do |group|
      user_ids = group.map(&:id)

      # 子ジョブを「予約」する。ここでループが回るたびにジョブが増える！
      ChildExecutionJob.perform_later(user_ids)
    end
    Rails.logger.debug '--- 親ジョブ：すべての小分け依頼が完了しました ---'
  end
end
