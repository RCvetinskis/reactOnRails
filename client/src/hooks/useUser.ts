import { useEffect, useState } from "react";
import { getUserInfo } from "../services/user-service";
import { useUserStore } from "../stores/user-store";

const useUser = () => {
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(true);
  // hook to refresh user data
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  return { user, setUser, loading };
};

export default useUser;
