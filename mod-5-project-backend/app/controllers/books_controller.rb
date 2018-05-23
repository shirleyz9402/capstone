class BooksController < ApplicationController
skip_before_action :authenticate!
  def create
    if Book.find_by(title: params[:title])
      render json: false
    else
      @book = Book.create(book_params)
      @library = Library.find_by(name: "Your Uploads", user_id: params[:user_id])
      @library.books << @book
      render json: @book
    end
  end
  def books_libraries
    @book = Book.find(params[:id])
    @library = Library.find_by(name: params[:name], user_id: params[:user_id], id: params[:library_id])
    if @library.books.find_by(title: @book.title)
      render json: false
    else
      @book.libraries << @library
      render json: @book
    end
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
