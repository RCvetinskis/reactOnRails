require "test_helper"

class Api::V1::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get posts" do
    get api_v1_search_post_url
    assert_response :success
  end
end
