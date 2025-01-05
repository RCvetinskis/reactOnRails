Rails.application.routes.draw do
  # Define API routes under /api/v1
  namespace :api do
    namespace :v1 do
      # Custom routes
      get "search/posts"

      # Resource routes for posts
      resources :posts

      # Devise routes for users
      devise_for :users, path: "users", controllers: {
        registrations: "users/registrations",
        sessions: "users/sessions",
        passwords: "users/passwords",
        confirmations: "users/confirmations"
      }
    end
  end

  # Health check route
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
