import { useUserStore } from "@/stores";
import { AuthService } from "@/services";
import { useEffect } from "react";
import { Navigate } from "react-router";

export function Callback() {
  const { isAuthenticated, login } = useUserStore();

  useEffect(() => {
    AuthService.loginCallback()
      .then((user) => {
        login(user);
      })
      .catch((error) => console.log(error));
  });

  if (isAuthenticated) return <Navigate to="/" />;

  return <>loding user ...</>;
}
