Rails.application.routes.draw do
  resources :libraries
  resources :books
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
