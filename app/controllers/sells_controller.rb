class SellsController < ApplicationController
before_action :set_sell, only: [:show, :edit, :update, :destroy]

def index
	@sells = Sell.all
end

private
	# Use callbacks to share common setup or constraints between actions.
    def set_sell
      @sell = Sell.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sell_params
      params.require(:sell).permit(:ci , :total , :date_sell , :created_at , :updated_at)
    end
end