class CreateHelps < ActiveRecord::Migration
  def change
    create_table :helps do |t|
      t.string :detail

      t.timestamps null: false
    end
  end
end
