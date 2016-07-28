class Role < ActiveRecord::Base
  belongs_to :pharmacy
  has_many :users
end
