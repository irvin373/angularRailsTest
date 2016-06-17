json.array!(@sells) do |sell|
  json.extract! sell, :id, :ci, :total, :date_sell
  json.url sell_url(sell, format: :json)
end