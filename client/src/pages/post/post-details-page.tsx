import { useEffect, useState } from "react";
import { IPost } from "../../types";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Loading from "../../components/loading";
import PostDeleteButton from "../../components/posts/post-delete-btn";
import PostEditButton from "../../components/posts/post-edit-btn";
import { getPostById } from "../../services/post-service";
import PostImage from "../../components/posts/post-image";

const PostDetailsPage = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  if (!id) return null;

  useEffect(() => {
    const loadCurrentPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.log("An error occured", error);
        setLoading(false);
      }
    };
    loadCurrentPost();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return (
      <h1 className="text-3xl w-full mx-auto text-center">No Post Found</h1>
    );
  }

  const imgUrl = post.image_url ?? "/assets/no_img.jpg";
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <PostImage imgUrl={imgUrl} />
        <CardDescription>{post.body}</CardDescription>
      </CardContent>

      <CardFooter className="flex justify-end items-center gap-3">
        <PostEditButton postId={id} />
        <PostDeleteButton postId={id} isPage />
      </CardFooter>
    </Card>
  );
};

export default PostDetailsPage;
