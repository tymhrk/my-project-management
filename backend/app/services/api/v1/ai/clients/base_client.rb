module Api
  module V1
    module Ai
      module Clients
        class BaseClient
          def generate_tasks(project_name:)
            raise NotImplementedError, "implement in subclass"
          end
        end
      end
    end
  end
end