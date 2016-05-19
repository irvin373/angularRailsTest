class Help < ActiveRecord::Base
	has_many :helpwiths
	has_many :products, :through => :helpwiths
end
