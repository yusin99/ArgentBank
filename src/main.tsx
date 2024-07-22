import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

// Components
import { store } from './redux/store';
import Home from './pages/home/home';
import Topbar from './components/navigation/topbar';
import Footer from './components/footer/footer';
import Profile from './pages/profil/profil';
import Login from './pages/login/login';

const router = createBrowserRouter([
  {
    element: (
      <>
        <Topbar />
        <Outlet />
        <Footer />
      </>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <div>Error</div>,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: (
      <>
        <Topbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
