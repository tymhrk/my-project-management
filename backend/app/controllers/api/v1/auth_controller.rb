class Api::V1::AuthController < Api::V1::BaseController
  before_action :authenticate_request!

  def current_user
    @current_user
  end

  private

  def authenticate_request!
    auth_header = request.headers['Authorization']
    token = auth_header&.split(' ')&.last

    token ||= cookies[:jwt_token]

    if token.present? && token == ENV["INTERNAL_API_KEY"]
      @current_user = User.first
      return 
    end

    if token.present?
      begin
        decoded = JWT.decode(token, ENV['DEVISE_JWT_SECRET_KEY'], true, { algorithm: 'HS256' })
        payload = decoded[0]
        
        @user = User.find_by(id: payload['sub'], jti: payload['jti'])
        
        if @user
          @current_user = @user
          return 
        end
      rescue JWT::DecodeError => e
        Rails.logger.error "JWT Decode Error: #{e.message}"
      end
    end

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end