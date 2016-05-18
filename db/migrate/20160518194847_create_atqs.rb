class CreateAtqs < ActiveRecord::Migration
  def change
    create_table :atqs do |t|
      t.string :detail

      t.timestamps null: false
    end
  end
end
