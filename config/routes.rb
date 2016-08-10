Rails.application.routes.draw do
  devise_for :users
  get 'logout' => 'pharmacy#unlogin'
  #root to: "home#index"
  #root to: 'login#index'
  root to: "products#index"
  resources :products
  resources :helps
  get 'reports/day/:date' => 'sells#report_day'
  get 'reports/day/:date1/:date2' => 'sells#report_dates'
  get 'reports/mounth/:date' => 'sells#report_mounth'
  get 'sells/last' => 'sells#last'
  get 'autocomplete' => 'products#options'
  get 'product_sell' => 'products#to_sell'
  get 'report_expiration' => 'lots#report_expiration'
  #get 'pharmacys' => 'pharmacy#index'
  resources :sells
  resources :atqs
  resources :companies
  resources :lots
  resources :pharmacy
  get 'users' => 'pharmacy#users'
  get 'users/:idP/change' => 'pharmacy#changeRol'
  get 'pharmacy/:idP/change' => 'pharmacy#change'
  #get  'sys' => 'products#index'
  post 'atqs/asign' => 'atqs#asign'
  post 'sells/asign' => 'sells#asign'
  get 'rols/:id' => 'rols#show'
  get 'lastLine' => 'companies#lastId'

  #get 'informs' => 'informs#index'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
