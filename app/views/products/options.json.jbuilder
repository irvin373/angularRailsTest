json.array!(@products) do |product|
  json.extract! product, :id, :comercialname
end