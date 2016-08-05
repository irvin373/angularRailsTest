json.array!(@lots) do |lot|
	if lot.available
		json.extract! lot, :id, :product_commercialname
  		json.url lot_url(lot, format: :json) 	
	end 
end