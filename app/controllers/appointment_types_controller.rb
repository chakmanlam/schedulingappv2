class AppointmentTypeController < ApplicationController
  before_action :set_appointment_type, only: %i[ show edit update destroy ]

  # GET /appointment_type or /appointment_type.json
  def index
    @appointment_type = AppointmentType.all
  end

  # GET /appointment_type/1 or /appointment_type/1.json
  def show
  end

  # GET /appointment_type/new
  def new
    @appointment_type = AppointmentType.new
  end

  # GET /appointment_type/1/edit
  def edit
  end

  # POST /appointment_type or /appointment_type.json
  def create
    @appointment_type = AppointmentType.new(appointment_type_params)

    respond_to do |format|
      if @appointment_type.save
        format.html { redirect_to appointment_type_url(@appointment_type), notice: "Appointment type was successfully created." }
        format.json { render :show, status: :created, location: @appointment_type }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @appointment_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /appointment_type/1 or /appointment_type/1.json
  def update
    respond_to do |format|
      if @appointment_type.update(appointment_type_params)
        format.html { redirect_to appointment_type_url(@appointment_type), notice: "Appointment type was successfully updated." }
        format.json { render :show, status: :ok, location: @appointment_type }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @appointment_type.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /appointment_type/1 or /appointment_type/1.json
  def destroy
    @appointment_type.destroy!

    respond_to do |format|
      format.html { redirect_to appointment_type_url, notice: "Appointment type was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_appointment_type
      @appointment_type = AppointmentType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def appointment_type_params
      params.require(:appointment_type).permit(:name)
    end
end
