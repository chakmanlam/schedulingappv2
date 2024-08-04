Rails.application.routes.draw do
  resources :bookings do
    collection do
      get :update_calendar
    end
  end
  resources :appointment_types
  resources :clients do
    collection do
      get :search
    end
  end
  devise_for :users

  authenticated :user do
    root "home#dashboard", as: :authenticated_root
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  get 'appointments', to: 'bookings#appointments'

  # Defines the root path route ("/")
  root "home#show"
end
