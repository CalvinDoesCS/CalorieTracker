
import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import FoodTablePage from './pages/FoodTablePage';
import { FoodsTable } from './components/FoodsTable';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Layout from './pages/Layout';
import ProtectedLayout from './pages/ProtectedLayout';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [   
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: '/food-logger',
            element: <FoodTablePage/>
          },
          {
            path: '/food-database',
            element: <FoodsTable />,
          },
        ],
      },
      {
        path: '/signup',
        element: <RegisterForm />,
      },
      {
        index: true,
        path: '/signin',
        element: <LoginForm />,
      },
    ],
  },
]);
export default router;
