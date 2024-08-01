class BookingsController < ApplicationController
  before_action :set_booking, only: %i[ show edit update destroy ]
  # before_action :authenticate_user!

  # GET /bookings or /bookings.json
  def index
    @bookings = Booking.includes(:user, :client).all
  end

  # GET /bookings/1 or /bookings/1.json
  def show
  end

  # GET /bookings/new
  def new
    @booking = Booking.new
  end

  # GET /bookings/1/edit
  def edit
  end

  # POST /bookings or /bookings.json
  def create
    user = User.find(booking_params[:user_id])

    client = Client.find_or_create_by(email: booking_params[:client_email], user: user) do |c|
      c.name = booking_params[:client_name]
      c.phone = booking_params[:client_phone]
    end

    @booking = Booking.new(booking_params.except(:client_name, :client_email, :client_phone, :date, :time))
    @booking.client = client
    @booking.user = user
    @booking.datetime = DateTime.parse("#{booking_params[:date]}T#{booking_params[:time]}")

    respond_to do |format|
      if @booking.save
        format.html { redirect_to booking_url(@booking), notice: "Booking was successfully created." }
        format.json { render :show, status: :created, location: @booking }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /bookings/1 or /bookings/1.json
  def update
    respond_to do |format|
      if @booking.update(booking_params)
        format.html { redirect_to booking_url(@booking), notice: "Booking was successfully updated." }
        format.json { render :show, status: :ok, location: @booking }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @booking.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /bookings/1 or /bookings/1.json
  def destroy
    @booking.destroy!

    respond_to do |format|
      format.html { redirect_to bookings_url, notice: "Booking was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def booking_params
      params.require(:booking).permit(:user_id, :appointment_type_id, :duration, :client_name, :client_email, :client_phone, :date, :time, :note)
    end
end