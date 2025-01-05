import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../../schemas/zod-schemas";
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
import { useTransition } from "react";
import { onSignUp } from "../../services/user-service";
import { useToast } from "../../hooks/use-toast";

const RegisterPage = () => {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
  });
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  async function onSubmit({ email, password }: z.infer<typeof signUpSchema>) {
    startTransition(() => {
      onSignUp(email, password)
        .then((res) => {
          if (res.ok) {
            toast({
              title: "Succesfully Created",
            });
            navigate("/sign-in");
          }
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
      <AuthCard
        title="Register"
        description="Register to use all features of the application"
      >
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
                      autoComplete="off"
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
                      autoComplete="off"
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeatPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat Password</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="password"
                      placeholder="Repeat Password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => navigate("/sign-in")}
                type="button"
                variant="outline"
                disabled={isPending}
              >
                Login
              </Button>
              <Button disabled={isPending} type="submit">
                Register
              </Button>
            </CardFooter>
          </form>
        </Form>
      </AuthCard>
    </div>
  );
};
export default RegisterPage;
