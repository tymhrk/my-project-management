module Api
  module V1
    module Auth
      class SessionsController < Devise::SessionsController
        respond_to :json

        def create
          user = User.find_by(email: params[:user][:email])

          if user&.valid_password?(params[:user][:password])
            warden.set_user(user, scope: :user)
            
            token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first

            render json: {
              message: "Logged in successfully",
              user: { email: user.email },
              token: token
            }, status: :ok
          else
            render json: { error: "Invalid email or password" }, status: :unauthorized
          end
        end
      end
    end
  end
end