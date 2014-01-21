Bssapp::Application.routes.draw do
  scope :api do
    resources :clients, defaults: {format: :json}
  end
  root 'home#index'
end