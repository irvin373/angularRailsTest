json.array!(@companies) do |company|
  json.extract! company, :id, :line
  json.url product_url(company, format: :json)
end