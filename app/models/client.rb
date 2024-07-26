class Client < ApplicationRecord
  has_many :bookings, dependent: :destroy
  belongs_to :user
  has_one_attached :profile_picture

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true

end
