import './App.css';

import Brands from './component/Brands/Brands.jsx';
import Register from './component/Register/Register.jsx';
import Login from './component/Login/Login.jsx';
import Chatbot from "./component/chatbot/Chat";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './component/Layout/Layout.jsx';

import Products from './component/Products/Products.jsx';
import AboutUs from './component/UserProfile/AboutUs';
import Notfound from './component/Notfound/Notfound.jsx';

import EditUser from './component/UserProfile/EditUser';
import UserProfile from './component/UserProfile/UserProfile.jsx';
import ChangePassword from './component/UserProfile/ChangePassword.jsx';

import ProtectedRout from './component/protectedRout/protectedRout.jsx';
import ProductDetails from './component/ProductDetails/ProductDetails.jsx';
import AllOrders from './component/AllOrders/AllOrders.jsx';
import Bell from './component/Bell/Bell.jsx';
import Cart from './component/Carts/Carts.jsx';
import Wishlist from './component/Wishlist/Wishlist.jsx';

import UserContextProvider from './Context/userContext';
import CartProvider from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import ThemeProvider from './Context/ThemeContext'; // ✅ ضيفنا ده

import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Offline } from 'react-detect-offline';
import "./styles/responsive.css";

import HelpCenter from "./component/UserProfile/HelpCenter";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRout>
            <Products />
          </ProtectedRout>
        ),
      },
      { path: 'about', element: <ProtectedRout><AboutUs /></ProtectedRout> },
      { path: 'brands', element: <ProtectedRout><Brands /></ProtectedRout> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      {
        path: 'ProductDetails/:id/:name?',
        element: (
          <ProtectedRout>
            <ProductDetails />
          </ProtectedRout>
        ),
      },
      { path: 'allorders', element: <ProtectedRout><AllOrders /></ProtectedRout> },
      { path: 'cart', element: <ProtectedRout><Cart /></ProtectedRout> },
      { path: 'wishlist', element: <ProtectedRout><Wishlist /></ProtectedRout> },
      { path: 'userProf', element: <ProtectedRout><UserProfile /></ProtectedRout> },
      { path: 'edit-profile', element: <ProtectedRout><EditUser /></ProtectedRout> },
      { path: 'change-password', element: <ProtectedRout><ChangePassword /></ProtectedRout> },
      { path: 'bell', element: <Bell /> },
      { path: 'help-center', element: <HelpCenter /> },
      { path: '*', element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider> {/* ✅ لفينا كل حاجة بيه */}
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={routes} />
              <Offline>
                <div className="offline bg-warning py-3 d-flex justify-content-center mb-1 mx-1 rounded-1 fw-semibold">
                  Sorry, You are currently <span className="fw-bold mx-1">offline</span>
                </div>
              </Offline>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}