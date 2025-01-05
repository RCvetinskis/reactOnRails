import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "../../schemas/zod-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import AuthCard from "../../components/auth/auth-card";
import { CardFooter } from "../../components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { useTransition } from "react";
import { onSignIn, setUserStorage } from "../../services/user-service";
import { useUserStore } from "../../stores/user-store";

const LoginPage = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { setUser } = useUserStore();
  async function onSubmit({ email, password }: z.infer<typeof signInSchema>) {
    startTransition(() => {
      onSignIn(email, password)
        .then((res) => {
          toast({
            title: "Succesfully Logged in",
          });
          setUserStorage(res);
          setUser(res.resource_owner);
          navigate("/account");
        })
        .catch((e) => {
          toast({
            title: "Failed to register",
            description: e.message,
            variant: "destructive",
          });
        });
    });
  }
  return (
    <div className="flex justify-center items-center">
      <AuthCard title="Login" description="Login to your account.">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="on"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="on"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button
                disabled={isPending}
                onClick={() => navigate("/sign-up")}
                type="button"
                variant="outline"
              >
                Register
              </Button>
              <Button disabled={isPending} type="submit">
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};
export default LoginPage;
