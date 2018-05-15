class User < ApplicationRecord
  has_many :libraries
  has_many :books, through: :libraries
  accepts_nested_attributes_for :libraries
end
