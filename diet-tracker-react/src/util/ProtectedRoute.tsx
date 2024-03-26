import { ReactNode } from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

interface Props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const isLoggedIn = useIsLoggedIn();

  return <>{isLoggedIn ? children : null}</>;
};
export default ProtectedRoute;
