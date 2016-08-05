class RolsController < ApplicationController
  before_action :set_rol, only: [:edit, :update, :destroy]
  before_action :authenticate_user!
# GET /rols || /rols.json
  def show
    @rol = Role.find(params[:id])
  end

	private
	# Use callbacks to share common setup or constraints between actions.
    # Never trust parameters from the scary internet, only allow the white list through.
    def rol_params
      params.require(:rol).permit(:name, :created_at ,:updated_at)
    end
end
