json.extract! booking, :id, :user_id, :client_id, :appointment_types_id, :datetime, :duration, :created_at, :updated_at
json.url booking_url(booking, format: :json)
