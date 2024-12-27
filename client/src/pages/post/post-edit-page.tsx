import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { useToast } from "../../hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { IPost } from "../../types";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import { editPost, getPostById } from "../../services/post-service";

const formSchema = z.object({
  title: z.string().optional(),
  body: z.string().optional(),
});
const PostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) return navigate("/");

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

  const { toast } = useToast();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const data = await editPost(id as string, values);
      navigate(`/post/${data.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return (
      <h1 className="text-3xl w-full mx-auto text-center">No Post Found</h1>
    );
  }

  return (
    <div>
      <h1 className="lg:text-2xl text-xl">Edit Post Form</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormMessage />
          <Button disabled={loading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PostEditPage;
