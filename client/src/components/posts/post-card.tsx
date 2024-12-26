import { Link } from "react-router-dom";
import { IPost } from "../../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  post: IPost;
};

const PostCard = ({ post }: Props) => {
  return (
    <Link to={`post/${post.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{post.body}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
