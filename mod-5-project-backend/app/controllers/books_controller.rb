class BooksController < ApplicationController
skip_before_action :authenticate!
  def create
    if Book.find_by(title: params[:title])
      render json: false
    else
      @book = Book.create(book_params)
      render json: @book
    end
  end
  def books_libraries
    @book = Book.find(params[:id])
    @library = Library.find_by(name: params[:name])
    @book.libraries << @library
      # @book.update(book_params)
      # @book.save
    render json: @book
    
  end
  def index
    render json: Book.all
  end

  def show
    @book = Book.find(params[:id])
    render json: @book
  end

  def update
    @book = Book.find(params[:id])
    @library = Library.find_by(name: params[:name])
    if @book.libraries.find(@library.id)
      render json: false
    else
      @book.libraries << library
      @book.update(book_params)
      render json: @book.libraries
    end
  end

  private

  def book_params
    params.require(:book).permit(:id, :title, :author, :cover, :url, libraries_attributes: [:id, :name, :user_id])
  end

end
