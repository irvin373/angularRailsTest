class CreateHelpwiths < ActiveRecord::Migration
  def change
    create_table :helpwiths do |t|
      t.references :product, index: true, foreign_key: true
      t.references :help, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
