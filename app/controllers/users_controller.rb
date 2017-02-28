class UsersController < ApplicationController
  def new
      @user = User.new

    end

    def create
      @user = User.new(user_params)
      if @user.save
        auto_login(@user)
        redirect_to root_path
      else
        render 'new'
      end
    end

    def show
      @user = User.find(params[:id])
    end



    #
    #   user = User.find(params[:id])
    #   poop = user.bookings.pluck(:space_id)
    #   spaces = Spaces.where(["space_id = ?", "poop")
    #   spaces.each do |s|
    #     s.find
    #     s.title
    #   end
    # end

    private
    def user_params
      params.require(:user).permit(:image, :first_name, :last_name, :email, :password, :password_confirmation)
    end


end
