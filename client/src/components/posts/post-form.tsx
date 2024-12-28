import { z } from "zod";
import { IPost } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { postFormSchema } from "../../schemas/zod-schemas";
import { X } from "lucide-react";
import PostImage from "./post-image";

type Props = {
  handleService: (data: FormData) => Promise<any>;
  initialData?: IPost;
};

const PostForm = ({ handleService, initialData }: Props) => {
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      body: initialData?.title ?? "",
      image: initialData?.image_url ?? undefined,
    },
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [displayFileInput, setDisplayFileInput] = useState(
    !!initialData?.image_url
  );

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      if (!displayFileInput) {
        formData.append("post[image]", values.image);
      }
      formData.append("post[title]", values.title);
      formData.append("post[body]", values.body);
      const data = await handleService(formData);
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

  const handleClearImg = () => {
    setDisplayFileInput(false);
  };
  return (
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
        {displayFileInput ? (
          <div className="relative">
            <PostImage
              imgUrl={initialData?.image_url ?? "/assets/no_img.jpg"}
            />
            <Button
              onClick={handleClearImg}
              className="absolute top-0 right-0"
              size={"icon"}
            >
              <X />
            </Button>
          </div>
        ) : (
          <FormField
            control={form.control}
            name="image"
            render={({ fieldState }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    placeholder="Description"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        form.setValue("image", file); // Set the file in the form state
                        form.clearErrors("image"); // Clear any previous errors
                      } else {
                        form.setError("image", {
                          type: "required",
                          message: "Image is required.",
                        });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        )}

        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
