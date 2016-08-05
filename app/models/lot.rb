class Lot < ActiveRecord::Base
  belongs_to :product
  belongs_to :pharmacy

  	def decrement_quantity(quantity)
  		self.quantity_lot -= quantity
  		if self.quantity_lot <= 0
  			self.available = false
  		end
  		self.save
  	end

  	def product_commercialname
  		puts self.product_id
		Product.select(:comercialname).find(self.product_id).comercialname
	end

	def productLot
		Lot.where(available: true, product_id: self.product_id).sum(:quantity_lot)
	end

	def to_builder
	    Jbuilder.new do |lot|
	      lot.(self, :product_commercialname, :productLot)
	    end
	end
end
