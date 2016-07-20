class AtqsController < ApplicationController
	before_action :set_atq, only: [:show, :edit, :update, :destroy]

# GET /atqs || /atqs.json
  def index
    @atqs = Atq.all
  end

  # GET /atqs/1 || /atqs/1.json 
  def show
  end

  #post asign
  def asign
    atq = params[:idAtq]
    product = params[:idProd]
    Comunicate.create(atq_id: atq, product_id: product)
    respond_to do |format|
        format.json { render json: {}, status: :ok }
    end
  end

  # GET /atqs/new
  def new
    @atq = Atq.new
  end

  # GET /atqs/1/edit
  def edit
  end

  # POST /atqs
  # POST /atqs.json
  def create
    @atq = Atq.new(atq_params)
    respond_to do |format|
      if @atq.save
        format.json { render :show, status: :created, location: @atq }
      else
        format.json { render json: @atq.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /atqs/1
  # PATCH/PUT /atqs/1.json
  def update
    respond_to do |format|
      if @atq.update(atq_params)
        format.json { render :show, status: :ok, location: @atq }
      else
        format.json { render json: @atq.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /atqs/1
  # DELETE /atqs/1.json
  def destroy
    Comunicate.where(atq_id: @atq.id).delete_all
    @atq.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

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
