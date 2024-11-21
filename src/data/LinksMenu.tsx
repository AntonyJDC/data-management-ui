import { 
  IoCreateSharp,
  IoAddCircleSharp,
  IoBackspaceSharp,
  IoSearchSharp,
  IoHomeSharp 
 } from "react-icons/io5";

import { ReactNode } from 'react';

// Interfaz para definir una ruta
export interface LinkItem {
  key: string;
  label: string;
  icon: ReactNode;
  to: string;
  notification: number;
  gap?: boolean;
  submenu?: LinkItem[];
}

export const linksMenu: LinkItem[] = [
  {
    key: 'home',
    label: 'Home',
    icon: <IoHomeSharp />,
    to: '/home',
    notification: 0,
    gap: false,
  },
  {
    key: 'create',
    label: 'Create',
    icon: <IoAddCircleSharp />,
    to: '/create',
    notification: 0,
    gap: false,
  },
  {
    key: 'read',
    label: 'Read',
    icon: <IoSearchSharp />,
    to: '/read',
    notification: 0,
    gap: false,
  },
  {
    key: 'update',
    label: 'Update',
    icon: <IoCreateSharp />,
    to: '/update',
    notification: 0,
    gap: false,
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <IoBackspaceSharp />,
    to: '/delete',
    notification: 0,
    gap: false,
  }
];

/* {
  path: 'contacts',
  errorElement: <ErrorPage />,
  children: [
    {
      path: 'clients',
      element: <ClientsPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: 'suppliers',
      element: <SuppliersPage />,
      errorElement: <ErrorPage />,
    },
  ],
},
 */
