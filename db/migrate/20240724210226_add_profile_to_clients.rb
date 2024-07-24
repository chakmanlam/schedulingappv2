class AddProfileToClients < ActiveRecord::Migration[7.1]
  def change
    add_column :clients, :profile_pictures, :string
  end
end
