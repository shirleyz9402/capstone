class LibrarySerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :name, :user_id, :books
  has_many :books, include_nested_associations: true
end
