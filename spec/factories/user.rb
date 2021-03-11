FactoryBot.define do
  factory :user do

    email { 'test_email' }
    password {'test_password'}
    admin {'admin_status'}
  end
end
