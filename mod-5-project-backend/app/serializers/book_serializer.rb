class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :library_id, :url, :cover
end
