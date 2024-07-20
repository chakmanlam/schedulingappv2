class CreateBookings < ActiveRecord::Migration[7.1]
  def change
    create_table :bookings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :client, null: false, foreign_key: true
      t.references :appointment_types, null: false, foreign_key: true
      t.datetime :datetime
      t.integer :duration

      t.timestamps
    end
  end
end
