import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../screens/root-layout.tsx';
import { HomeScreen } from '../screens/home-screen.tsx';
import { ErrorScreen } from '../screens/error-screen.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorScreen />, 
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
    ],
  },
]);
