import { useEffect, useState } from "react";
import PostCard from "./post-card";
import { usePostStore } from "../../stores/post-store";
import Loading from "../loading";
import { getPosts } from "../../services/post-service";

const PostsList = () => {
  const { posts, setPosts } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.log("An error occured", error);
        setLoading(false);
      }
    };
    loadPosts();
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
