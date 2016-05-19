json.array!(@products) do |product|
  json.extract! product, :id, :code, :comercialname, :genericname, :unitprice, :line
  json.url product_url(product, format: :json)
end