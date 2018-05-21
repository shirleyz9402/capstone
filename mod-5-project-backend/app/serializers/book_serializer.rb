class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :url, :cover
  has_many :libraries

end
