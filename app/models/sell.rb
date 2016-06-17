class Sell < ActiveRecord::Base
	has_many :details
  has_many :products, :through => :details

  	def sell_details
  		@details = self.details.map{|x| [Product.select(:id, :comercialname).find(x.product_id).comercialname, x.quantity, x.sellpromo]}
  	end

  	def to_builder
	    Jbuilder.new do |product|
	      product.(self, :sell_details)
	    end
  	end
end
