module Api
  module V1
    module Auth
      class PasswordsController < Devise::PasswordsController
        respond_to :json

        def create
          self.resource = resource_class.send_reset_password_instructions(resource_params)
          if successfully_sent?(resource)
            render json: { message: "Reset instructions sent" }, status: :ok
          else
            render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
          end
        end

        def update
          self.resource = resource_class.reset_password_by_token(resource_params)
          if resource.errors.empty?
            render json: { message: "Password updated successfully" }, status: :ok
          else
            render json: { error: resource.errors.full_messages }, status: :unprocessable_entity
          end
        end
      end
    end
  end
end