Rails.application.routes.draw do
  resources :movies do
    #collection do
    #  post :confirm
  #  end
  end
  root 'movies#index'
end
