import { useEffect, useState } from "react";
import { IPost } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import Loading from "../../components/loading";
import { Button } from "../../components/ui/button";
import PostDeleteButton from "../../components/posts/post-delete-btn";
import { Edit } from "lucide-react";

const PostDetailsPage = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  if (!id) return null;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (error) {
        console.log("An error occured", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPost();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return (
      <h1 className="text-3xl w-full mx-auto text-center">No Post Found</h1>
    );
  }

  return (
    <Card>
      <CardDescription>
        <CardTitle className="text-3xl">{post.title}</CardTitle>
      </CardDescription>
      <CardContent className="text-lg">{post.body}</CardContent>
      <CardFooter className="flex justify-end items-center gap-3">
        <Button size={"icon"} onClick={() => navigate(`/post/${id}/edit`)}>
          <Edit />
        </Button>
        <PostDeleteButton postId={id} isPage />
      </CardFooter>
    </Card>
  );
};

export default PostDetailsPage;
