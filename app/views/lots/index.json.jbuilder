json.array!(@lots) do |lot|
	if lot.available
		json.extract! lot, :id, :product_commercialname, :date_in, :percentage_gain,:date_expiration, :cost_in, :quantity_lot, :available, :unitprice, :line
  		json.url lot_url(lot, format: :json) 	
	end 
end

