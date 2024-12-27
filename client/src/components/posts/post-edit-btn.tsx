import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

type Props = {
  postId: string | number;
};

const PostEditButton = ({ postId }: Props) => {
  const navigate = useNavigate();
  return (
    <Button size={"icon"} onClick={() => navigate(`/post/${postId}/edit`)}>
      <Edit />
    </Button>
  );
};

export default PostEditButton;
