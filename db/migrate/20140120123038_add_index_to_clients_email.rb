class AddIndexToClientsEmail < ActiveRecord::Migration
  def change
  	add_index :clients, :email, unique: true
  end
end
