import { useEffect } from "react";
import { Navigate } from "react-router";
import { AuthService } from "@/services";
import { useUserStore } from "@/stores";

export function Login() {
  const { isAuthenticated, login } = useUserStore();

  useEffect(() => {
    if (!isAuthenticated)
      AuthService.getUser()
        .then((user) => {
          if (user === null) AuthService.login();
          else login(user);
        })
        .catch(() => AuthService.login());
  }, []);

  if (isAuthenticated) return <Navigate to="/" />;

  return <>loging in ...</>;
}
