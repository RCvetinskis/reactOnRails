import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { IPost } from "../../types";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { editPost, getPostById } from "../../services/post-service";
import PostForm from "../../components/posts/post-form";

const formSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
});
const PostEditPage = () => {
  const { id } = useParams();

  if (!id)
    return (
      <h1 className="text-3xl w-full mx-auto text-center">No Post Found</h1>
    );

  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  useEffect(() => {
    const loadCurrentPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
        form.setValue("title", data.title, { shouldDirty: true });
        form.setValue("body", data.body, { shouldDirty: true });
      } catch (error) {
        console.log("An error occured", error);
      } finally {
        setLoading(false);
      }
    };
    loadCurrentPost();
  }, [id, form.setValue]);

  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return (
      <h1 className="text-3xl w-full mx-auto text-center">No Post Found</h1>
    );
  }

  const handleEdit = async (formData: FormData) => {
    const data = await editPost(id.toString(), formData);
    return data;
  };
  return (
    <div>
      <h1 className="lg:text-2xl text-xl">Edit Post Form</h1>
      <PostForm handleService={handleEdit} initialData={post} />
    </div>
  );
};

export default PostEditPage;
