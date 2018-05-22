Rails.application.routes.draw do
  post '/sessions/', to: 'sessions#create'
  get '/users/', to: 'users#index'
  get '/books', to: 'books#index'
  get '/libraries/', to: 'libraries#index'
  post '/users/', to: 'users#create'
  post '/books/', to: 'books#create'
  post '/libraries/', to: 'libraries#create'
  get '/users/:user_id', to: 'users#show'
  get '/books/:id', to: 'books#show'
  post '/books/:id/libraries', to: 'books#books_libraries'
  get '/users/:user_id/libraries', to: 'users#users_libraries'
  get '/libraries/:id/books', to: 'libraries#libraries_books'
  get '/libraries/:id', to: 'libraries#show'
  patch '/libraries/:id', to: 'libraries#update'
  patch '/books/:id', to: 'books#update'
  delete '/users/:user_id/libraries/:library_id', to: 'users#users_libraries'
  delete '/libraries/:id', to: 'libraries#destroy'
end
