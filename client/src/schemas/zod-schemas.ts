import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  body: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  image: z
    .union([z.instanceof(File), z.string()])
    .refine(
      (fileOrUrl) => {
        if (typeof fileOrUrl === "string") {
          return fileOrUrl.startsWith("http"); // Check if it's a valid URL
        }
        return fileOrUrl.size <= 2 * 1024 * 1024; // Check file size if it's a File
      },
      {
        message: "Image must be smaller than 2MB or a valid URL.",
      }
    )
    .refine(
      (fileOrUrl) => {
        if (typeof fileOrUrl === "string") {
          return true; // Skip type check for URL
        }
        return ["image/jpeg", "image/png", "image/gif"].includes(
          fileOrUrl.type
        );
      },
      {
        message: "Only JPEG, PNG, or GIF images are allowed.",
      }
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(4, {
      message: "Email must be at least 4 characters.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export const signUpSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .min(4, {
        message: "Email must be at least 4 characters.",
      }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    repeatPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match.",
    path: ["repeatPassword"],
  });
