import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

interface Props {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: Props) => {
  const isLoggedIn = useIsLoggedIn();

  return <>{isLoggedIn ? children : null}</>;
};
export default ProtectedRoute;
