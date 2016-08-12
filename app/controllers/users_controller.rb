class UsersController < ApplicationController
  before_action :find_user, except: [:index, :create, :new]

  def index
    if params[:ids]
      @users = []
	binding.pry

      params[:ids].split(",").map(&:to_i).each do |user_id|
	@users << User.find(user_id)
      end
    else
      @users = User.all
    end
  end

  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save 
      redirect_to :root
    end
  end

  def update
    @user.update(user_params)
  end

  def show
  end

  private

    def find_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:first_name, :last_name, :bio, :mission, :image_url)
    end
end
