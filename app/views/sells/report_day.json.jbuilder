json.array!(@sells) do |sell|
  json.extract! sell, :id, :ci, :total, :date_sell, :user_detail
end