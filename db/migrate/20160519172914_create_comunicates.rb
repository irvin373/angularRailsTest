class CreateComunicates < ActiveRecord::Migration
  def change
    create_table :comunicates do |t|
      t.references :atq, index: true, foreign_key: true
      t.references :product, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
