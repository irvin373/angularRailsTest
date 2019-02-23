class AddPharmacyIdToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :pharmacy, index: true, foreign_key: true
  end
end
