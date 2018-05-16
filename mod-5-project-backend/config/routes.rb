Rails.application.routes.draw do
  post '/sessions/', to: 'sessions#create'
  get '/users/', to: 'users#index'
  get '/users/:user_id', to: 'users#show'
  post '/users/', to: 'users#create'
  # post '/users/', to: 'application#logged_in'
  get '/users/:user_id/libraries', to: 'users#users_libraries'
  get '/libraries/', to: 'libraries#index'
  post '/libraries/', to: 'libraries#create'
  get '/books/', to: 'books#index'
  post '/books/', to: 'books#create'
  delete '/users/:user_id/libraries/:library_id', to: 'users#users_libraries'
  delete '/libraries/:id/books/:book_id', to: 'libraries#libraries_books'
end
