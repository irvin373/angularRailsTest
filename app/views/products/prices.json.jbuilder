json.array!(@products) do |product|
  json.extract! product, :id,:unitprice
  json.url product_url(product, format: :json)
end