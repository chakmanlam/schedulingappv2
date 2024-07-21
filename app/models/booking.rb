class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :client
  belongs_to :appointment_type

  validates :appointment_type, presence: true
  validates :datetime, presence: true
  validates :duration, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
