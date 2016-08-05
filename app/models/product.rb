class Product < ActiveRecord::Base
  belongs_to :company
  has_many :comunicates
  has_many :atqs, :through => :comunicates
  has_many :helpwiths
  has_many :helps, :through => :helpwiths
  has_many :details
  has_many :sells, :through => :details
  has_many :lots

  def line
  	self.company.line
  end

  def atq
  	resp = []
  	self.atqs.each do |atq|
  		resp << atq.detail
  	end
  	resp
  end

  def help
  	resp = []
  	self.helps.each do |help|
  		resp << help.detail
  	end
  	resp
  end

   def to_builder
    Jbuilder.new do |product|
      product.(self, :line, :atq, :help)
    end
  end

end
