class AddPharmacyIdToSell < ActiveRecord::Migration
  def change
    add_reference :sells, :pharmacy, index: true, foreign_key: true
  end
end
