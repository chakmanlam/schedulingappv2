class RenameAppointmentTypesIdInBookings < ActiveRecord::Migration[7.1]
  def change
    rename_column :bookings, :appointment_types_id, :appointment_type_id
  end
end
