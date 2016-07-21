class AddPercentageGainToLots < ActiveRecord::Migration
  def change
    add_column :lots, :percentage_gain, :integer
  end
end
