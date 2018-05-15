class CreateLibraries < ActiveRecord::Migration[5.1]
  def change
    create_table :libraries do |t|
      t.string :name
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
