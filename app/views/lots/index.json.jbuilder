json.array!(@lots) do |lot|
	if lot.available
		json.extract! lot, :id, :product, :date_in, :date_expiration, :cost_in, :quantity_lot, :available
  		json.url lot_url(lot, format: :json) 	
	end 
end

