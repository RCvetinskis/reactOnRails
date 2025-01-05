import { useEffect, useState } from "react";
import useUser from "./useUser";
import { IRoute } from "../types";
import UserMenu from "../components/auth/user/user-menu";

const useRoutes = () => {
  const { user, loading } = useUser();
  const [routes, setRoutes] = useState<IRoute[]>([]);
  useEffect(() => {
    setRoutes([
      {
        path: "/",
        label: "Home",
        Component: null,
      },
      {
        path: "/new",
        label: "New Post",
        Component: null,
      },
      user
        ? {
            path: null,
            label: "User Menu",
            Component: <UserMenu user={user} />,
          }
        : {
            path: "/sign-in",
            label: "Sign in",
            Component: null,
          },
    ]);
  }, [user]);

  return { routes, loading };
};

export default useRoutes;
