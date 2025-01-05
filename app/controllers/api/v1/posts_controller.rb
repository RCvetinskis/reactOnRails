class Api::V1::PostsController < ApplicationController
  before_action :authenticate_user!, except: %i[index show]
  before_action :set_post, only: %i[show update destroy]

  # GET /posts
  def index
    posts_per_page = params[:limit] || 10

    if params[:q].present?
      @posts = Post.where("title LIKE ? OR body LIKE ?", "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)
    else
      @posts = Post.order(created_at: :desc)
    end

    post_with_images = paginate_posts(@posts, posts_per_page)
    total_posts_count = Post.count

    render json: {
      data: post_with_images,
      total_count: total_posts_count,
      per_page: posts_per_page
    }
  end

  # GET /posts/1
  def show
    if @post.image.attached?
      render json: @post.as_json.merge(image_url: url_for(@post.image))
    else
      render json: @post.as_json.merge(image_url: nil)
    end
  end

  # POST /posts

  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      render json: @post, status: :created, location: api_v1_post_url(@post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end


  # PATCH/PUT /posts/1
  def update
    if @post.user == current_user
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  # DELETE /posts/1
  def destroy
    if @post.user == current_user
      @post.destroy!
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end

  private

  def authenticate_user!
    token = request.headers["Authorization"]&.split(" ")&.last
    unless token
      return render json: { error: "Not Authorized" }, status: :unauthorized
    end

    begin
      jwt_payload = JWT.decode(token, Rails.application.secret_key_base).first
      @current_user = User.find(jwt_payload["sub"])
    rescue JWT::DecodeError
      render json: { error: "Invalid Token" }, status: :unauthorized
    end
  end
  # Use callbacks to share common setup or constraints between actions.

  def set_post
    @post = Post.find(params[:id]) # Use `params[:id]` to fetch the Post
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Post not found" }, status: :not_found
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :body, :image)
  end
end
