class AddPresentationToProducts < ActiveRecord::Migration
  def change
    add_column :products, :presentation, :string
  end
end
