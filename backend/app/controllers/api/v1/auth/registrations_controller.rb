module Api
  module V1
    module Auth
      class Auth::RegistrationsController < Devise::RegistrationsController
        respond_to :json
      end
    end
  end
end