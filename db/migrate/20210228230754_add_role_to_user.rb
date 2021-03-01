class AddRoleToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :superadmin_role, :boolean, default: false
    add_column :users, :contributor_role, :boolean, default: false
    add_column :users, :user_role, :boolean, default: true
  end
end
