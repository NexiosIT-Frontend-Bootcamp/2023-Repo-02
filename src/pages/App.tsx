import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./main/Main";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import RouteGuard from "../guards/RouteGuard";
import AuthenticatedRouteGuard from "../guards/AuthedRouteGuard";
import NotFound from "./notfound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteGuard component={<Main />} />,
  },
  {
    path: "/login",
    element: <AuthenticatedRouteGuard component={<SignIn />} />,
  },
  {
    path: "/register",
    element: <AuthenticatedRouteGuard component={<SignUp />} />
  }, 
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
