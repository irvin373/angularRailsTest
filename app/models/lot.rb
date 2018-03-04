class Lot < ActiveRecord::Base
  belongs_to :product
  belongs_to :pharmacy

  def line
    resp = self.product
    if resp.nil?
      resp = Product.first
    end
    resp.line
  end

  def decrement_quantity(quantity)
      self.quantity_lot -= quantity
      if self.quantity_lot <= 0
          self.available = false
      end
      self.save
  end

  def product_commercialname
      Product.select(:comercialname).find(self.product_id).comercialname
  end

  def presentation
      Product.select(:comercialname).find(self.product_id).presentation
  end

  def colorExpiration
    resp = "green"
    date = self.date_expiration
    today = Time.now.to_date
    limitDate3 = today + 3.month
    limitDate2 = today + 2.month
    if date > limitDate2 && date < limitDate3
      resp = "yellow"
    else
      if date < limitDate3
        resp = "red"
      end
    end
    resp
  end

  def unitprice
    Product.select(:unitprice).find(self.product_id).unitprice
  end

  def productLot
      Lot.where(available: true, product_id: self.product_id).sum(:quantity_lot)
  end

  def to_builder
      Jbuilder.new do |lot|
          lot.(self,:line,:product_commercialname, :productLot, :unitprice, :presentation,:colorExpiration)
      end
  end

end
