# app/services/ai/clients/base_client.rb
module Ai
  module Clients
    class BaseClient
      def generate_tasks(project_name:)
        raise NotImplementedError, "implement in subclass"
      end
    end
  end
end
