module Api
  module V1
    class BaseController < ActionController::API
      rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
      include ActionController::Cookies
      include ActionController::MimeResponds

      private

      def render_not_found(e)
        render json: { error: e.message }, status: :not_found
      end

      def current_user
        @current_user ||= warden.authenticate(scope: :user)
      end
    end
  end
end
