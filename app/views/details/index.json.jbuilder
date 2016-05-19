json.array!(@details) do |detail|
  json.extract! detail, :id, :sell_id, :product_id, :quantity, :promo, :sellpromo
  json.url product_url(detail, format: :json)
end