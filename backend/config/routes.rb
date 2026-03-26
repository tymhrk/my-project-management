require 'sidekiq/web'

Sidekiq::Web.use ActionDispatch::Cookies
Sidekiq::Web.use ActionDispatch::Session::CookieStore, key: '_interslice_session'

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, as: :user, path: 'auth', controllers: {
        sessions: 'api/v1/auth/sessions',
        registrations: 'api/v1/auth/registrations'
      }

      resource :profile, only: %i[show update], controller: 'users'

      namespace :ai do
        resources :projects, only: [] do
          resources :task_generations, only: [:create]
        end
      end

      resources :projects do
        resources :tasks, only: %i[index create] do
          collection do
            post :bulk_create
          end
        end
      end

      resources :tasks, only: %i[show update destroy]
    end
  end

  get 'up' => 'rails/health#show', as: :rails_health_check
  mount Sidekiq::Web => '/sidekiq'
end
