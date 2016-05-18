class CreateSells < ActiveRecord::Migration
  def change
    create_table :sells do |t|
      t.string :ci
      t.float :total
      t.date :date_sell

      t.timestamps null: false
    end
  end
end
