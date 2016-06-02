class Atq < ActiveRecord::Base
	has_many :comunicates
	has_many :products, :through => :comunicates

	def Have_products
		products = self.products
		resp = []
		products.each do |product|
			#product.created_at = Company.find(product.company_id).line
			resp << product
		end
		return resp
	end

	def to_builder
    Jbuilder.new do |atq|
      atq.(self, :Have_products)
    end
  end
end
