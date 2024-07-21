class Booking < ApplicationRecord
  belongs_to :user
  belongs_to :client
  belongs_to :appointment_type

  validates :appointment_type, presence: true
  validates :datetime, presence: true
  validates :duration, presence: true, numericality: { only_integer: true, greater_than: 0 }

  before_save :set_start_and_end_time

  private

  def set_start_and_end_time
    self.start_time = datetime
    self.end_time = datetime + duration.minutes
  end
end
