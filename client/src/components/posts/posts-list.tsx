import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import PostCard from "./post-card";
import { usePostStore } from "../../stores/post-store";
import Loading from "../loading";

const PostsList = () => {
  // fetch posts from the API
  const { posts, setPosts } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("An error occured", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid w-full justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6  gap-3  ">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
