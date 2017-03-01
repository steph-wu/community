class ReviewsController < ApplicationController

  # before_action :load_space

  def new
    @space = Space.find(params[:id])
    @review = Review.new
  end

  def index
    @space = Space.find(params[:id])
  end

  def show
    @space = Space.find(params[:id])
  end

  def create
    @space = Space.find(params[:space_id])
    @review = @space.reviews.build(review_params)
    @review.user = current_user

    respond_to do |format|
      if @review.save
        format.html { redirect_to space_url(@space.id), notice: 'Review added!'}
        format.js  # server will look at comment/create.js.erb
      else
        format.html {render 'space/show', notice: 'There was an error!'}
        format.js
      end
    end
  end

  def destroy
    @space = Space.find(params[:id])
  end


private

  def review_params
    params.require(:review).permit(:content)
  end

  def load_space
    @space = Space.find(params[:id])
  end

end
