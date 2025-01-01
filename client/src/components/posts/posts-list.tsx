import { useEffect, useState } from "react";
import PostCard from "./post-card";
import Loading from "../loading";
import { getPosts } from "../../services/post-service";
import { IAPIPostsResult, IPost } from "../../types";
import { usePostStore } from "../../stores/post-store";
import { limit } from "../../constants";

type Props = {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  q?: string;
  page?: number;
};
const PostsList = ({ posts, setPosts, q, page = 1 }: Props) => {
  const [loading, setLoading] = useState(true);
  const { setTotalPages } = usePostStore();
  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const result = (await getPosts(page, limit, q)) as IAPIPostsResult;

        setTotalPages(Math.ceil(result.total_count / result.per_page));
        setPosts(result.data);
      } catch (error) {
        console.log("An error occured", error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, [q, page]);

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
