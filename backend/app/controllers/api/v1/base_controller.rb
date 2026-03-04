module Api::V1
  class BaseController < ApplicationController
    before_action :authenticate_internal_api!

    private

    def authenticate_internal_api!
      auth_header = request.headers['Authorization']
      token = auth_header&.split(' ')&.last
      expected_token = ENV["INTERNAL_API_KEY"]

      if token.blank? || token != expected_token
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    end
  end
end