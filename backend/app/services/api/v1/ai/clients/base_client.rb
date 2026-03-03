module Api::V1::Ai::Clients
  class BaseClient
    def initialize
      @client = OpenAI::Client.new(
        access_token: Rails.application.credentials.dig(:open_router, :api_key),
        uri_base: "https://openrouter.ai/api",
        request_timeout: 60
      )
    end
  end
end
