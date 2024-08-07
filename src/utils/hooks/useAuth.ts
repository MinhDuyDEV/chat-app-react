import { useContext, useEffect, useState } from "react";

import { getAuthUser } from "@/utils/api";
import { AuthContext } from "@/utils/contexts/AuthContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        updateAuthUser(data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => setLoading(false), 1000);
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
};
