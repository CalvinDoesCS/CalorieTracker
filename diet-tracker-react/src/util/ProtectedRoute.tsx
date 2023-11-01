
import React from "react";
import { useIsLoggedIn } from "../hooks/useIsLoggedIn";

interface Props {
    children : React.ReactNode
}

const ProtectedRoute = ({children} : Props) => {
    const isLoggedIn = useIsLoggedIn();
    
    return (
        <>
            {
                isLoggedIn ? children : null
            }
        </>
    );
}
export default ProtectedRoute;