json.array!(@pharmacys) do |pharmacy|
  json.extract! pharmacy, :id, :name
end