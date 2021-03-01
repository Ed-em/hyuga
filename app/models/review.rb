class Review < ApplicationRecord
  belongs_to :movie
  belongs_to :user
  validates :movie_id, uniqueness: { scope: :user_id, message: "You've reviewed this movie!" }
end
