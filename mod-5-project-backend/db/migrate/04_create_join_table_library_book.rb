class CreateJoinTableLibraryBook < ActiveRecord::Migration[5.1]
  def change
    create_join_table :libraries, :books do |t|
      # t.index [:library_id, :book_id]
      # t.index [:book_id, :library_id]
    end
  end
end
