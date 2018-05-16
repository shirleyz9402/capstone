class LibrariesController < ApplicationController

  def create
    @library = Library.new
    @library.name = params[:name]
    @library.user_id = params[:user_id]
    render json: @library
  end

  def libraries_books
    if current_user_id && current_user_id == params[:user_id]
      @library = Library.find_by(user_id: params[:user_id])
      if @library
        render json: @library.books
      else
        render nothing: true, :status => :not_found
      end
    else #NOT AUTHORIZED
      render nothing: true, :status => :unauthorized
    end
  end

  def index
    if logged_in?
      render json: Library.all
    else
      render json: { go_away: true }
    end
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
    params.require(:library).permit(:id, :name, :user_id, books_attributes:[:id, :title, :author, :cover, :url])
  end

end