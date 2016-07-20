class Lot < ActiveRecord::Base
  belongs_to :product

  	def product_commercialname
  		100.times{ print "="}
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
