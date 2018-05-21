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
  def books_libraries
    # if current_user_id && current_user_id.to_s == params[:user_id]
      @book = Book.find_by(id: params[:id])
      @library = Library.find_by(name: params[:name])
      @book.libraries << library
        render json: @book.libraries
      # end
    # end
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

  private

  def book_params
    params.require(:book).permit(:id, :title, :author, :cover, :url, libraries_attributes: [:id, :name, :user_id])
  end
  # def libraries_attributes
  #   params.require(:book).permit(libraries_attributes: [:id, :name, :user_id])
  # end

end
