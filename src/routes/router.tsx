import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layout/DashboardLayout';
import { ErrorPage } from '../presentation/ErrorPage';
import { NotFoundPage } from '../presentation/NotFoundPage';
import { CreatePage, DeletePage, HomePage, LogsPage, ReadPage, UpdatePage } from '../pages/index';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <HomePage/>, // Puedes reemplazar esto por un componente Home real
      },
      {
        path: 'create',
        element: <CreatePage/>,
      },
      {
        path: 'update',
        element: <UpdatePage/>,
      },
      {
        path: 'delete',
        element: <DeletePage/>,
      },
      {
        path: 'read',
        element: <ReadPage/>,
      },
      {
        path: 'logs',
        element: <LogsPage/>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
