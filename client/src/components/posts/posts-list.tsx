import { useEffect, useState } from "react";
import PostCard from "./post-card";
import Loading from "../loading";
import { getPosts } from "../../services/post-service";
import { IPost } from "../../types";

type Props = {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  q?: string;
};
const PostsList = ({ posts, setPosts, q }: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const data = await getPosts(q);
        setPosts(data);
      } catch (error) {
        console.log("An error occured", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [q]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="grid w-full justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-3  ">
      {!posts.length && <h1 className="text-3xl">Posts not found</h1>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
