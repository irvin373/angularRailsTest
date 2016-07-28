class Pharmacy < ActiveRecord::Base
	has_many :roles
	has_many :lots
	has_many :sells
end
