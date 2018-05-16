class UsersController < ApplicationController
  # before_action :admin
  skip_before_action :authenticate!, only: [:create, :index, :show ]


  def create
    @user = User.new
    @user.username = params[:username]
    @user.password = params[:password]
    if @user.save
      render json: user_hash(@user)
    else
      render json: {
        errors: @user.errors.full_messages
      }
    end
  end

  def users_libraries
    if current_user_id && current_user_id == params[:user_id]
      @user = User.find_by(id: params[:user_id])
      if @user
        render json: @user.libraries
      else
        render nothing: true, :status => :not_found
      end
    else #NOT AUTHORIZED
      render nothing: true, :status => :unauthorized
    end
  end

  def index
    @users = User.all
    render json: @users
  end


  def show
    @user = User.find(params[:user_id])
    if @user
      render json: @user
    end
  end

  def update
    @user = User.find(params[:user_id])
    if @user
      @user.update(user_params)
      render json: user_hash(@user)
    end
    render json: @user
  end

  def destroy
    @user = User.find(params[:user_id])
    @user.libraries.destroy_all
    @user.destroy
    render json: User.all
  end

  private

  def user_params
    params.require(:user).permit(:user_id, :id, :username, :password, :password_digest, libraries_attributes: [:id, :name, :books])
  end

  # def admin
  #   if current_user_id && current_user_id == params[:user_id]
  #     puts 'true'
  #     @user = User.find_by(id: params[:user_id])
  #     if @user.id != 1
  #       authenticate!
  #     end
  #   end
  # end

end
