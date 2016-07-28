class CompaniesController < ApplicationController
	before_action :set_company, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
# GET /companys || /companys.json
  def index
		@companies = Company.all
	end

  # GET /companys/1 || /companys/1.json 
  def show
  end

  # GET /companys/new
  def new
    @company = Company.new
  end

  # GET /companies/1/edit
  def edit
  end

  # POST /companies
  # POST /companies.json
  def create
    @company = Company.new(company_params)

    respond_to do |format|
      if @company.save
        #format.html { redirect_to @company, notice: 'Company was successfully created.' }
        format.json { render :show, status: :created, location: @company }
      else
        #format.html { render :new }
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /companys/1
  # PATCH/PUT /companys/1.json
  def update
    respond_to do |format|
      if @company.update(company_params)
        #format.html { redirect_to @company, notice: 'Company was successfully updated.' }
        format.json { render :show, status: :ok, location: @company }
      else
        #format.html { render :edit }
        format.json { render json: @company.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /companys/1
  # DELETE /companys/1.json
  def destroy
    @company.destroy
    respond_to do |format|
      #format.html { redirect_to companys_url, notice: 'Company was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

	private
	# Use callbacks to share common setup or constraints between actions.
    def set_company
      @company = Company.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def company_params
      params.require(:company).permit(:line, :created_at , :updated_at)
    end
end
