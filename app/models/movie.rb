class Movie < ApplicationRecord
  validates :title, presence: true
  validates :playtime, presence: true
  validates :director, presence: true
  validates :description, presence: true
  validates :movie_img, presence: true
  belongs_to :user
  belongs_to :genre
  has_many :reviews
  enum status: [:pending, :published]
  validates_uniqueness_of :title, :case_sensitive => false

  paginates_per 4
  has_attached_file :movie_img, styles: { movie_index: "250x350>", movie_image: "400x600>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :movie_img, content_type: /\Aimage\/.*\z/
end
