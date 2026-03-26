class ChildExecutionJob < ApplicationJob
  queue_as :default

  def perform(user_ids)
    # 渡されたIDのユーザーたちを1件ずつ処理
    User.where(id: user_ids).find_each do |_user|
      # 擬似的な処理（本来はメール送信など）
      # Rails.logger.info "User ID: #{user.id} を処理中..."
      sleep 0.01 # 1000件で10秒くらいかかる計算
    end
    Rails.logger.debug { "--- 子ジョブ（#{user_ids.size}件）が完了しました ---" }
  end
end
