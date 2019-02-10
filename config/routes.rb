Rails.application.routes.draw do
  get 'markers/:icon_type/:id/:color.:format', to:'markers#show'
  get 'markers', to: 'markers#index'
  get 'top/index'
  root 'top#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
