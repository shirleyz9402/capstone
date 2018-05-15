class UsersController < ApplicationController

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render json: @user
  end

  def destroy
    @user = User.find(params[:id])
    @user.libraries.destroy_all
    @user.destroy
    render json: User.all
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, libraries_attributes: [:id, :name, :books])
  end

end
