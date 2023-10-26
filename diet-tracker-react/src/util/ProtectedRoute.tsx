
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTokenStore from "../hooks/useTokenStore";

interface Props {
    children : React.ReactNode
}
const ProtectedRoute = ({children} : Props) => {
    const {accessToken} = useTokenStore();

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUserToken = () => {
        const userToken = accessToken;
        if (!userToken || userToken === null) {
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