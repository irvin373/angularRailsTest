class CompaniesController < ApplicationController
	before_action :set_company, only: [:show, :edit, :update, :destroy]

	#all about /companies and /companies.json
	def index
		
	end

	#all abput /companies/1 and /companies/1.json
	def show 
		
	end



	private
	# Use callbacks to share common setup or constraints between actions.
    def set_company
      @companies = Company.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def company_params
      params.require(:company).permit(:line, :created_at , :updated_at)
    end
end
