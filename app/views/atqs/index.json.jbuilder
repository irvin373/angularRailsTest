json.array!(@atqs) do |atq|
  json.extract! atq, :id, :detail
  json.url product_url(atq, format: :json)
end