class HelpsController < ApplicationController
	before_action :set_help, only: [:show, :edit, :update, :destroy]

	private
	# Use callbacks to share common setup or constraints between actions.
    def set_help
      @helps = Help.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def help_params
      params.require(:help).permit(:detail, :created_at , :updated_at)
    end
end
