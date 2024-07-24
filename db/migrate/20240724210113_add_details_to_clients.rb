class AddDetailsToClients < ActiveRecord::Migration[7.1]
  def change
    add_column :clients, :gender, :string
    add_column :clients, :date_of_birth, :date
  end
end
