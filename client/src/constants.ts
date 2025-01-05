export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://mocked-api-url"
    : import.meta.env.VITE_API_URL;

export const routes = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/new",
    label: "New Post",
  },

  {
    path: "/sign-in",
    label: "Sign in",
  },
];

export const limit = 10;

export const mockUser = {
  id: 10441,
  email: "test@gmail.com",
};
