class Posts::CommentsController < ApplicationController
  before_action :set_post, only: [:index, :create]

  def index
    @comments = Comment.where(post: @post)

    render json: @comments, status: :ok
  end

  def create
    @comment = Comment.new(post: @post, user: current_user, text: comment_params[:text])

    if @comment.save
      render json: {success: "Comment successfully created."}, status: :created
    else
      render json: {error: "Unable to comment."}, status: :bad_request
    end
  end

  def destroy
    @comment = Comment.find_by(id: comment_params[:id])

    if @comment.present? && @comment.destroy
      render json: {success: "Comment successfully removed."}, status: :ok
    else
      render json: {error: "Comment does not exist."}, status: :not_found
    end
  end

  private

  def set_post
    @post = Post.find_by!(id: comment_params[:post_id])
  end

  def comment_params
    params.permit(:id, :post_id, :text)
  end
end
