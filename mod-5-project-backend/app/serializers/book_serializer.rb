class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :url, :cover, :libraries
end
