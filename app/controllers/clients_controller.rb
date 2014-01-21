class ClientsController < ApplicationController

	respond_to :json

	def index
		respond_with Client.all
	end

	def create
		respond_with Client.create(client_params)
	end

	def destroy
		respond_with Client.destroy(params[:id])
	end

	private

		def client_params
			params.require(:client).permit(:name, :email)
		end

end
