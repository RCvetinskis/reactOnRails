import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { API_URL } from "../../constants";
import { useToast } from "../../hooks/use-toast";
import { usePostStore } from "../../stores/post-store";
import { useNavigate } from "react-router-dom";

type Props = {
  postId: string | number;
  isPage?: boolean;
};

const PostDeleteButton = ({ postId, isPage }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { removePost } = usePostStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleDelete = async (postId: string | number) => {
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        if (isPage) {
          navigate("/");
          toast({
            title: "Successfully deleted post",
          });
        }
        removePost(postId);
        toast({
          title: "Successfully deleted post",
        });
      } else {
        throw response;
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message || "Server error",
      });
    }
  };

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          handleDelete(postId);
        });
      }}
      size={"icon"}
      variant={"destructive"}
    >
      <Trash />
    </Button>
  );
};

export default PostDeleteButton;
