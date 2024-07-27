class Client < ApplicationRecord
  include PgSearch::Model

  pg_search_scope :search_by_name, against: :name, using: { tsearch: { prefix: true } }

  has_many :bookings, dependent: :destroy
  belongs_to :user
  has_one_attached :profile_picture

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true
end
