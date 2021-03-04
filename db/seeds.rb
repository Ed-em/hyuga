# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
25.times do |t|
    User.create! :name => "Panin Ghana#{t}", :username => "Panin#{t}", :email => "edem#{t}@gmail.com", :password => "mysecret#{t}", :password_confirmation => "mysecret#{t}", :superadmin_role => false, :user_role => true
end
