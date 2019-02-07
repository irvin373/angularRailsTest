class Sell < ActiveRecord::Base
    belongs_to :pharmacy
    belongs_to :user
    has_many :details
    has_many :products, :through => :details

    def sell_details
        @details = self.details.map{|x| [Product.select(:id, :comercialname).find(x.product_id).comercialname, x.quantity, x.sellpromo]}
    end

    def user_email
        if self.user != nil
            @email = self.user.email
        else
            @email = "no registrado"
        end
    end

    def user_detail
        @user = self.user
    end

    def total_day
      Sell.where(date_sell:Time.now.to_date).sum(:total)
    end

    def day_selected
      Time.now.to_date
    end

    def to_builder
        Jbuilder.new do |product|
            product.(self, :sell_details, :total_day, :pharmacy_id, :day_selected, :user_detail)
        end
    end
end
