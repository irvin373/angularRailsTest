class AtqsController < ApplicationController
	before_action :set_atq, only: [:show, :edit, :update, :destroy]

	private
	# Use callbacks to share common setup or constraints between actions.
    def set_atq
      @atq = Atq.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def atq_params
      params.require(:atq).permit(:detail, :created_at , :updated_at)
    end
end
