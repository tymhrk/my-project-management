module Api
  module V1
    class AuthController < Api::V1::BaseController
      before_action :authenticate_request!
      attr_reader :current_user

      private

      def authenticate_request!
        @current_user = find_user_by_internal_key || find_user_from_token
        render_unauthorized unless @current_user
      end

      def find_user_by_internal_key
        token = http_auth_token
        User.first if token.present? && token == ENV['INTERNAL_API_KEY']
      end

      def find_user_from_token
        token = http_auth_token
        return nil if token.blank?

        decoded = decode_token(token)
        return nil unless decoded

        User.find_by(id: decoded[:sub], jti: decoded[:jti])
      end

      def http_auth_token
        request.headers['Authorization']&.split&.last || cookies[:jwt_token]
      end

      def decode_token(token)
        secret = ENV['DEVISE_JWT_SECRET_KEY'] || Warden::JWTAuth.config.secret
        body = JWT.decode(token, secret, true, { algorithm: 'HS256' })[0]
        body.with_indifferent_access
      rescue JWT::DecodeError => e
        Rails.logger.error "JWT Decode Error: #{e.message}"
        nil
      end

      def render_unauthorized
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
end
