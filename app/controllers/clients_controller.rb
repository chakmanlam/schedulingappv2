class ClientsController < ApplicationController
  before_action :set_client, only: %i[ show edit update destroy ]

  # GET /clients or /clients.json
  def index
    @clients = Client.all
  end

  def search
    begin
      if params[:query].present?
        @clients = Client.search_by_name(params[:query])
      else
        @clients = Client.all
      end

      respond_to do |format|
        format.turbo_stream { render "clients/search" }
        format.html { render partial: 'clients/search_results', locals: { clients: @clients } }
      end
    rescue => e
      logger.error "Error during search: #{e.message}"
      respond_to do |format|
        format.turbo_stream { render turbo_stream: turbo_stream.replace("results", partial: "clients/error", locals: { error: e.message }) }
        format.html { render partial: 'clients/error', locals: { error: e.message }, status: :internal_server_error }
      end
    end
  end

  # GET /clients/1 or /clients/1.json
  def show
    @bookings = @client.bookings.includes(:user, :appointment_type)
  end

  # GET /clients/new
  def new
    @client = Client.new
  end

  # GET /clients/1/edit
  def edit
  end

  # POST /clients or /clients.json
  def create
    @client = Client.new(client_params)

    respond_to do |format|
      if @client.save
        format.html { redirect_to client_url(@client), notice: "Client was successfully created." }
        format.json { render :show, status: :created, location: @client }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clients/1 or /clients/1.json
  def update
    respond_to do |format|
      if @client.update(client_params)
        format.html { redirect_to client_url(@client), notice: "Client was successfully updated." }
        format.json { render :show, status: :ok, location: @client }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clients/1 or /clients/1.json
  def destroy
    @client.destroy!

    respond_to do |format|
      format.html { redirect_to clients_url, notice: "Client was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_client
      @client = Client.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def client_params
      params.require(:client).permit(:name, :email, :phone, :gender, :date_of_birth, :profile_picture)
    end
end
