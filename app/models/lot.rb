class Lot < ActiveRecord::Base
  belongs_to :product

  	def product
		Product.find(self.product_id).comercialname 
	end

	def productLot
		Lot.where(available: true, product_id: self.product_id).sum(:quantity_lot)
	end

	def to_builder
	    Jbuilder.new do |lot|
	      lot.(self, :product, :productLot)
	    end
	end
end
