import PostForm from "../../components/posts/post-form";
import { createPost } from "../../services/post-service";

const NewPostPage = () => {
  return (
    <div>
      <h1 className="lg:text-2xl text-xl">New Post Form</h1>
      <PostForm handleService={createPost} />
    </div>
  );
};

export default NewPostPage;
