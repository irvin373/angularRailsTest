json.array!(@atqs) do |atq|
  json.extract! atq, :id, :detail
  json.url atq_url(atq, format: :json)
end