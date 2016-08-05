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

  def to_sell
    @idPharmacy = current_user.role.pharmacy.id
    resp = Lot.where(product_id: self.id, pharmacy_id: @idPharmacy).sum(:quantity_lot)
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
      product.(self, :line, :atq, :help, :to_sell)
    end
  end

end
