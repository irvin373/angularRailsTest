json.array!(@products) do |product|
  json.extract! product, :id, :code, :comercialname, :genericname, :unitprice, :company_id
  json.url product_url(product, format: :json)
end