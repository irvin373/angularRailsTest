class PharmacyController < ApplicationController
  before_action :set_pharmacy, only: [:edit, :update, :destroy]
  before_action :authenticate_user!
# GET /pharmacys || /pharmacys.json
  def index
    @pharmacys = Pharmacy.all
  end

  def users    
    @users = User.all
  end

  # GET /pharmacys/1 || /pharmacys/1.json 
  def show
  end

  def changeRol
    id = params[:idP]
    user = User.find(id)
    if ser.role_id == 2
      user.role_id = 1
      user.save
    end
  end

  def change
  	@id = params[:idP]
  	rol = current_user.role
  	rol.pharmacy_id = @id
  	rol.save
  end
  # GET /pharmacys/new
  def new
    @pharmacy = Pharmacy.new
  end

  # GET /pharmacys/1/edit
  def edit
  end

  # POST /pharmacys
  # POST /pharmacys.json
  def create
    @pharmacy = Pharmacy.new(pharmacy_params)
    respond_to do |format|
      if @pharmacy.save
        format.json { render :show, status: :created, location: @pharmacy }
      else
        format.json { render json: @pharmacy.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /pharmacys/1
  # PATCH/PUT /pharmacys/1.json
  def update
    respond_to do |format|
      if @pharmacy.update(pharmacy_params)
        format.json { render :show, status: :ok, location: @pharmacy }
      else
        format.json { render json: @pharmacy.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pharmacys/1
  # DELETE /pharmacys/1.json
  def destroy
    @pharmacy.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

	private
	# Use callbacks to share common setup or constraints between actions.
    def set_pharmacy
      @pharmacy = Pharmacy.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pharmacy_params
      params.require(:pharmacy).permit(:name, :created_at ,:updated_at)
    end
end
