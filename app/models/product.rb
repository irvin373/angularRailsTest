class Product < ActiveRecord::Base
  belongs_to :company
  has_many :comunicates
  has_many :atqs, :through => :comunicates
  has_many :helpwiths
  has_many :helps, :through => :helpwiths
  has_many :details
  has_many :sells, :through => :details
  has_many :lots
end
