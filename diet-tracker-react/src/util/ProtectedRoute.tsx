
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    children : React.ReactNode
}
const ProtectedRoute = ({children} : Props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = localStorage.getItem("user-token");
        if (!userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/signin');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
            checkUserToken();
        }, [isLoggedIn]);
    return (
        <>
            {
                isLoggedIn ? children : null
            }
        </>
    );
}
export default ProtectedRoute;