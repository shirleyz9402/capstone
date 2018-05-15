class LibrariesController < ApplicationController

  def create
    @library = Library.create(library_params)
    render json: @library
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
    @library.books.destroy_all
    @library.destroy
    render json: Library.all
  end 

  private

  def library_params
    params.require(:library).permit(:id, :name, books_attributes:[:id, :title, :author, :cover, :url])
  end

end
