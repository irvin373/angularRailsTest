class LotsController < ApplicationController
	before_action :set_lot, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
# GET /lots || /lots.json
  def index
    @idPharmacy = current_user.role.pharmacy.id
    @lots =Lot.where(available: true, pharmacy_id: @idPharmacy)

    # if params[:search]
    #   @searchUpcase = params[:search].upcase
    #   @product = Product.where("comercialname LIKE ? OR comercialname LIKE ?", "%#{params[:search]}%","%#{@searchUpcase}%").take(1)
    #   @lots =Lot.where(available: true, pharmacy_id: @idPharmacy, product_id: @product.first.id)
    # else
    #   @lots =Lot.where(available: true, pharmacy_id: @idPharmacy)
    # end
  end

  # GET /lots/1 || /lots/1.json 
  def show
  end

  def report_expiration
    today = Time.now.to_date
    limitDate = today + 3.month
    @lots = Lot.where(date_expiration: (today..limitDate))
  end

  # GET /lots/new
  def new
    @lot = Lot.new
  end

  # GET /lots/1/edit
  def edit
  end

  # POST /lots
  # POST /lots.json
  def create
    @idPharmacy = current_user.role.pharmacy.id
    @lot = Lot.new(lot_params)
    @lot.available = true
    @lot.pharmacy_id = @idPharmacy
    respond_to do |format|
      if @lot.save
        format.json { render :show, status: :created, location: @lot }
      else
        format.json { render json: @lot.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lots/1
  # PATCH/PUT /lots/1.json
  def update
    respond_to do |format|
      if @lot.update(lot_params)
        format.json { render :show, status: :ok, location: @lot }
      else
        format.json { render json: @lot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lots/1
  # DELETE /lots/1.json
  def destroy
    @lot.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

	private
	# Use callbacks to share common setup or constraints between actions.
    def set_lot
      @lot = Lot.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def lot_params
      params.require(:lot).permit(:product_id, :date_in, :date_expiration, :cost_in, 
      	:quantity_lot, :available,:pharmacy_id, :created_at ,:percentage_gain, :updated_at)
    end
end
