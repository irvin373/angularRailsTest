json.array!(@helps) do |help|
  json.extract! help, :id, :detail
  json.url product_url(help, format: :json)
end