json.array!(@products) do |product|
  json.extract! product, :id, :code
  json.url product_url(product, format: :json)
end
