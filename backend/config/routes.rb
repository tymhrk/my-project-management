Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      namespace :ai do
        resources :projects, only: [] do
          resources :task_generations, only: [:create]
        end
      end

      resources :projects do
        resources :tasks, only: [:index, :create]
      end

      resources :tasks, only: [:show, :update, :destroy]
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end