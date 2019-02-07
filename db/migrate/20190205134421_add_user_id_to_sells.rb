class AddUserIdToSells < ActiveRecord::Migration
  def change
    add_reference :sells, :user, index: true, foreign_key: true
  end
end
