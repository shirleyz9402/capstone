class BooksController < ApplicationController

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
    if logged_in?
      render json: Book.all
    else
      render json: { go_away: true }
    end
  end

  def show
    @book = Book.find(params[:id])
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
