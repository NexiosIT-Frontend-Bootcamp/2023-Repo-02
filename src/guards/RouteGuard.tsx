import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

function RouteGuard({ component }: {component: JSX.Element}) {
    const { jwt } = useUserContext();

    const isAllowed = () => {
        let flag = false;

       //check user has JWT token
       jwt ? flag = true : flag = false
      
       return flag
    }

    return (
        isAllowed() ? component : <Navigate to="/login" />
    );
}

export default RouteGuard;