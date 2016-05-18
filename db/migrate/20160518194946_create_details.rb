class CreateDetails < ActiveRecord::Migration
  def change
    create_table :details do |t|
      t.references :product, index: true, foreign_key: true
      t.references :sell, index: true, foreign_key: true
      t.integer :quantity
      t.float :sellpromo
      t.boolean :promo

      t.timestamps null: false
    end
  end
end
