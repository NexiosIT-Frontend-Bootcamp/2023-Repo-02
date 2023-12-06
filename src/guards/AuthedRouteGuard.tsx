import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function AuthenticatedRouteGuard({ component }: {component: JSX.Element}) {
    const { jwt } = useUserContext();

    const isAllowed = () => {
        let flag = false;
 
       //check user has JWT token
       jwt ? flag = false : flag = true
      
       return flag
    }

    return (
        isAllowed() ? component : <Navigate to="/" />
    );
}

export default AuthenticatedRouteGuard;