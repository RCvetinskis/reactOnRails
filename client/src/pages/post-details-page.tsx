import { useEffect, useState } from "react";
import { IPost } from "../types";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import Loading from "../components/loading";

const PostDetailsPage = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
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
    </Card>
  );
};

export default PostDetailsPage;
