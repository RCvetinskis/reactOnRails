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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../../services/post-service";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});
const NewPostPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const data = await createPost(values);
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

  return (
    <div>
      <h1 className="lg:text-2xl text-xl">New Post Form</h1>
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

export default NewPostPage;
