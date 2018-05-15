class LibrarySerializer < ActiveModel::Serializer
  attributes :id, :name, :books
  belongs_to :user
  has_many :books, include_nested_associations: true
end
