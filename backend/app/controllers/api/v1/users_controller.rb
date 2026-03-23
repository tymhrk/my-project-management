module Api
  module V1
    class UsersController < Api::V1::AuthController
      def show
        if current_user.nil?
          render json: { error: '認証が必要です' }, status: :unauthorized
          return
        end

        render_profile(current_user)
      end

      def update
        if current_user.update(user_params)
          render_profile(current_user)
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_content
        end
      end

      private

      def render_profile(user)
        return render json: { error: 'Unauthorized' }, status: :unauthorized if user.nil?

        render json: user.as_json(include: :projects).merge(avatar_url: user.avatar.attached? ? url_for(user.avatar) : nil, task_counts: current_user.task_counts)
      end

      def user_params
        params.expect(user: %i[name bio avatar])
      end
    end
  end
end
