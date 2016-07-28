class AddPharmacyIdToLot < ActiveRecord::Migration
  def change
    add_reference :lots, :pharmacy, index: true, foreign_key: true
  end
end
