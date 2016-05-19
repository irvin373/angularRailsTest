class Atq < ActiveRecord::Base
	has_many :comunicates
	has_many :products, :through => :comunicates
end
