class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest
  has_many :libraries, include_nested_associations: true
end
