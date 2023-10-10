import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import SignUpForm from "./components/SignUpForm";

const router = createBrowserRouter([  
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/signup",
          element: <SignUpForm/>
        }
      ],
    },
  ]);
  export default router;