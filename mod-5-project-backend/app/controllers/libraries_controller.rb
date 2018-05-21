class LibrariesController < ApplicationController
skip_before_action :authenticate!
  def create
    @library = Library.create(library_params)
    # @library.name = params[:name]
    # @library.user_id = params[:user_id]
    render json: @library
  end

  def libraries_books
    # if current_user_id && current_user_id.to_s == params[:user_id]
      @library = Library.find_by(id: params[:id])
      @book = Book.includes(:libraries).find(@library.id)

      @library.books << @book
        render json: @library.books
      # end
    # end
  end

  def index
    @libraries = Library.all
    render json: @libraries
  end

  def show
    @library = Library.find(params[:id])
    render json: @library
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
