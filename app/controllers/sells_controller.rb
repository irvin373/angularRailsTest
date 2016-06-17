  class SellsController < ApplicationController
before_action :set_sell, only: [:show, :edit, :update, :destroy]

# GET /sells || /sells.json
  def index
		@sells = Sell.all
	end

  # GET /sells/1 || /sells/1.json 
  def show
  end

  def updateTotal(sell)
    sell.details.select(:quantity, :sellpromo).map{|x| x.quantity*x.sellpromo}.reduce(:+)
  end

  def asign
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
    @sell = Sell.new(sell_params)
    
    respond_to do |format|
      if @sell.save
        #format.html { redirect_to @sell, notice: 'Sell was successfully created.' }
       format.json { render :show, status: :created, location: @atq }
      else
        format.json { render json: @atq.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sells/1
  # PATCH/PUT /sells/1.json
  def update
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