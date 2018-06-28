class LibrariesController < ApplicationController
  
skip_before_action :authenticate!
  def create
    @library = Library.create(library_params)
    render json: @library, :message => true
  end

  def show
    # if current_user_id && current_user_id.to_s == params[:user_id]
    @library = Library.find_by(id: params[:id])
    render json: @library
    # end
  end
  def libraries_books
    @library = Library.find(params[:id])
    @book = Book.find_by(title: params[:title])
    if @book.libraries.find(@library)
      render json: false
    else
      @library.books << @book
      render json: @library
    end
  end
  def index
    @libraries = Library.all
    render json: @libraries
  end

  def update
    @library = Library.find(params[:id])
    @library.update(library_params)
    render json: @library
  end

  def destroy
    @library = Library.find(params[:id])
    @library.destroy
    render json: Library.all
  end

  private

  def library_params
    params.require(:library).permit(:id, :name, :user_id, books_attributes:[:id, :title, :author, :cover, :url])
  end

end
