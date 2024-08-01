class AddNoteToBookings < ActiveRecord::Migration[7.1]
  def change
    add_column :bookings, :note, :text
  end
end
