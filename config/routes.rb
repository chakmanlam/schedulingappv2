Rails.application.routes.draw do
  resources :contacts, only: [:new, :create]
  resources :bookings
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
  get 'contact', to: 'contacts#new'
  get 'terms-of-service', to: 'pages#terms_of_service'

  # Defines the root path route ("/")
  root "home#show"
end
