json.array!(@products) do |product|
  json.extract! product, :id, :code, :comercialname, :genericname, :unitprice, :line
end