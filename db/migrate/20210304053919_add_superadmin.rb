class AddSuperadmin < ActiveRecord::Migration[5.2]
  def change
    User.create! do |u|
        u.email     = 'test_admin@gmail.com'
        u.password  = 'password'
        u.name = 'admin'
        u.username = 'superadmin'
        u.superadmin_role = true
    end
  end
end
