class SpacesController < ApplicationController
  #before_action :require_login, only: [:new, :create]

  def index
    @spaces = Space.search(params[:search])
  end

  def show
    @space = Space.find(params[:id])
    @reviews = @space.reviews

    if current_user
      @review = Review.new
    end

    respond_to do |format|
      format.html
      format.json
      format.js
    end

  end

  def new
    @space = Space.new
    @space.avatar = params[:file]
  end

  def create
    @space = Space.new(space_params)

      if @space.save
        redirect_to spaces_url
      else
        render :new
      end
  end

  def edit
    @space = Space.find(params[:id])
  end

  def update
    @space = Space.find(space_params)
  end

  def destroy
    @space = Space.find(params[:id])
    space.destroy
    redirect_to spaces_url
  end

  private
  def space_params
    params.require(:space).permit(:title, :description, :address, :check_in, :check_out, :rules, :capacity, :bathrooms, :price, :size, {avatars: []})
  end
end
