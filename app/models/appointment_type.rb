class AppointmentType < ApplicationRecord
  has_many :bookings

  validates :name, presence: true, uniqueness: true
end
