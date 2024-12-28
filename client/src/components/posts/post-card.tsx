import { Link } from "react-router-dom";
import { IPost } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PostDeleteButton from "./post-delete-btn";
import PostEditButton from "./post-edit-btn";
import PostImage from "./post-image";

type Props = {
  post: IPost;
};

const PostCard = ({ post }: Props) => {
  const imgUrl = post.image_url ?? "/assets/no_img.jpg";
  return (
    <Card>
      <Link to={`post/${post.id}`}>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <PostImage imgUrl={imgUrl} />
          <CardDescription>{post.body}</CardDescription>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-end items-center gap-3">
        <PostEditButton postId={post.id} />
        <PostDeleteButton postId={post.id} />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
