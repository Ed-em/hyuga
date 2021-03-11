FactoryBot.define do
  factory :movie do

    title { 'test_name' }
    playtime { '1' }
    director { '1' }
    description {'test_description'}
    movie_img {'test_image'}
  end
end
