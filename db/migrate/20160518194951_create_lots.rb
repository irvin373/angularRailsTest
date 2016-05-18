class CreateLots < ActiveRecord::Migration
  def change
    create_table :lots do |t|
      t.references :product, index: true, foreign_key: true
      t.date :date_in
      t.date :date_expiration
      t.float :cost_in
      t.integer :quantity_lot
      t.boolean :available

      t.timestamps null: false
    end
  end
end
