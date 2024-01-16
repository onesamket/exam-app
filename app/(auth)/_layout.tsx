import { Redirect, Stack } from "expo-router";
import useAuth from "hooks/auth-provider";

const AuthLayout = () => {
  const { authState: { isAuthenticated } } = useAuth();
  if (isAuthenticated) return Redirect({ href: "/(tabs)/profile" })
  return (
    <Stack />
  )
}
export default AuthLayout;
