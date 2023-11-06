import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./util/ProtectedRoute";
import { FoodsTable } from "./components/FoodsTable";

const router = createBrowserRouter([  
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ProtectedRoute><HomePage/></ProtectedRoute>,
        },
        {
          path: "/food-database",
          element: <FoodsTable></FoodsTable>
        },
        {
          path: "/signup",
          element: <RegisterForm/>
        },
        {
          path: "/signin",
          element: <LoginForm/>
        }
      ],
    },
  ]);
  export default router;