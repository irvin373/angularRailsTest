  class SellsController < ApplicationController
before_action :set_sell, only: [:show, :edit, :update, :destroy]
before_action :authenticate_user!
# GET /sells || /sells.json

  def index
    @idPharmacy = current_user.role.pharmacy.id
    @idUser = current_user.id
    @idRol = current_user.role_id
    if params[:search]
      @searchUpcase = params[:search].upcase
      @sells = Sell.where(pharmacy_id: @idPharmacy).where("ci LIKE ? OR ci LIKE ?", "%#{params[:search]}%","%#{@searchUpcase}%")
      if @idRol == 1
          @sells = @sells.where(user_id: @idUser)
      end
    else
      @sells = Sell.where(pharmacy_id: @idPharmacy)
      if @idRol == 1
          @sells = @sells.where(user_id: @idUser)
      end
    end
  end

  # GET /sells/1 || /sells/1.json 
  def show
  end

  def last
    @sell = Sell.last
  end

  def report_dates
    @idPharmacy = current_user.role.pharmacy.id
    @idUser = current_user.id
    @idRol = current_user.role_id
    date_ini = Date.parse(params[:date1])
    puts date_ini
    date_end = Date.parse(params[:date2])
    puts date_end
    if @idRol == 2
      @sells = Sell.where(pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    elsif @idRol == 1
      @sells = Sell.where(user_id: @idUser,pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    end
  end

  def report_day
    @idPharmacy = current_user.role.pharmacy.id
    @idUser = current_user.id
    @idRol = current_user.role_id
    date = params[:date]
    if @idRol == 2
      @sells = Sell.where(pharmacy_id: @idPharmacy,date_sell: Date.parse(date))
    elsif @idRol == 1
      @sells = Sell.where(user_id: @idUser,pharmacy_id: @idPharmacy,date_sell: Date.parse(date))
    end
  end

  def report_mounth
    @idPharmacy = current_user.role.pharmacy.id
    @idUser = current_user.id
    @idRol = current_user.role_id
    date_ini = Date.parse(params[:date]) 
    date_end = date_ini.end_of_month
    if @idRol == 2
      @sells = Sell.where(pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    elsif @idRol == 1
      @sells = Sell.where(user_id: @idUser,pharmacy_id: @idPharmacy,date_sell: (date_ini..date_end))
    end
  end

  def updateTotal(sell)
    sell.details.select(:quantity, :sellpromo).map{|x| x.quantity*x.sellpromo}.reduce(:+)
  end

  def asign
    @idPharmacy = current_user.role.pharmacy.id
    @detail = Detail.new
    @detail.product_id = params[:product_id] 
    @detail.sell_id = params[:sell_id] 
    @detail.quantity = params[:quantity] 
    @detail.sellpromo = params[:sellpromo]
    
    @product = Product.find(@detail.product_id)
    if @product.unitprice == @detail.sellpromo
      @detail.promo = false
    else
      @detail.promo = true
    end

    i = 0
    size = @detail.quantity
    @lots = Lot.where(product_id: @detail.product_id, pharmacy_id: @idPharmacy).sort_by{|x| x.date_in}
    
    while size > 0
      size_lot = @lots[i].quantity_lot
      if size_lot >= size
        @lots[i].decrement_quantity(size)
        size = 0  
      else
        @lots[i].decrement_quantity(size_lot)
        size = size - size_lot
        i=i+1
      end
    end

    respond_to do |format|
      if @detail.save
        @sell = Sell.find(@detail.sell_id)
        @sell.total = updateTotal(@sell)
        @sell.save
        #format.html { redirect_to @sell, notice: 'Sell was successfully created.' }
        format.json { render :show, status: :created, location: @sell }
      else
        #format.html { render :new }
        format.json { render json: @sell.errors, status: :unprocessable_entity }
      end
    end
  end

  # GET /sells/new
  def new
    @sell = Sell.new
  end

  # GET /sells/1/edit
  def edit
  end

  # POST /sells
  # POST /sells.json
  def create
    @idPharmacy = current_user.role.pharmacy.id
    @idUser = current_user.id
    @sell = Sell.new(sell_params)
    @sell.pharmacy_id = @idPharmacy
    @sell.user_id = @idUser
    respond_to do |format|
      if @sell.save
        #format.html { redirect_to @product, notice: 'Product was successfully created.' }
        format.json { render :show, status: :created, location: @sell }
      else
        format.json { render json: @sell.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sells/1
  # PATCH/PUT /sells/1.json
  def update
    authorize! :edit_sell, @sell
    respond_to do |format|
      if @sell.update(sell_params)
        #format.html { redirect_to @sell, notice: 'Sell was successfully updated.' }
        format.json { render :show, status: :ok, location: @sell }
      else
        #format.html { render :edit }
        format.json { render json: @sell.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sells/1
  # DELETE /sells/1.json
  def destroy
    authorize! :delete_sell, @sell
    @sell.destroy
    respond_to do |format|
      #format.html { redirect_to sells_url, notice: 'Sell was successfully destroyed.' }
      format.json { head :no_content }
    end
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
