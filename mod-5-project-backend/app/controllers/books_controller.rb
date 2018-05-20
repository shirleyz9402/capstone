class BooksController < ApplicationController
skip_before_action :authenticate!
  def create
    library = Library.find_by(id: params[:library_id])
    if library.books.find{|book| book.title == params[:title]}
      render json: false
    else
      @book = Book.create(book_params)
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
    @book.update(book_params)
    render json: @book
  end

  def destroy
    @book = Book.find(params[:id])
    @book.destroy
    render json: Book.all
  end

  private

  def book_params
    params.require(:book).permit(:id, :title, :author, :cover, :url, :library_id)
  end

end
