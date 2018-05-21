class Book < ApplicationRecord
has_and_belongs_to_many :libraries
accepts_nested_attributes_for :libraries
end
