class Api::V1::BaseController < ActionController::API
  before_action :authenticate_request!

  private

  def authenticate_request!
    # Wardenの authenticate! を使ってJWT認証を試みる
    # 失敗しても例外を出さず、nil を返すようにする
    begin
      user = warden.authenticate(scope: :user)
    rescue
      user = nil
    end

    # JWTで認証できた場合、current_user をセットして続行
    if user
      @current_user = user
      return
    end

    # JWTで認証できなかった場合、APIキーを確認
    auth_header = request.headers['Authorization']
    token = auth_header&.split(' ')&.last
    
    unless token == ENV["INTERNAL_API_KEY"]
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  # 便利メソッドとして定義
  def current_user
    @current_user
  end
end