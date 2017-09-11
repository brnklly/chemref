Rails.application.routes.draw do
  root to: 'static_pages#home'
  get '/table', to: 'elements#index'
  get '/element/:symbol', to: 'elements#show', as: 'element'

end
