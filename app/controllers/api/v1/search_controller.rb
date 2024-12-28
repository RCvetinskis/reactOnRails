class Api::V1::SearchController < ApplicationController
  def posts
 # if you are using a different DB, might need to use ILIKE instead of LIKE
 @posts = Post.where("title LIKE ? OR body LIKE ?", "%#{params[:q]}%", "%#{params[:q]}%").order(created_at: :desc)

    post_with_images = @posts.map do |post|
      if post.image.attached?
        post.as_json.merge(image_url: url_for(post.image))
      else
        post.as_json.merge(image_url: nil)
      end
      end

      render json: post_with_images
  end
end
