import React, { Suspense, useContext } from "react";
import { Route, Navigate, Routes, useMatch } from "react-router-dom";
import { Flex, Spinner } from "@chakra-ui/react";
import './style.css';
import { AuthProvider, AuthContext } from './context/auth-context';
import { ItemsProvider } from './context/items-context';

const Auth = React.lazy(() => import('./pages/Auth'));
const AllItems = React.lazy(() => import('./pages/AllItems'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Admin = React.lazy(() => import('./pages/Admin'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const CurrentOrder = React.lazy(() => import('./pages/CurrentOrder'));
const IncomingOrders = React.lazy(() => import('./pages/IncomingOrders'));
const Profile = React.lazy(() => import('./pages/Profile'));
const VerifyEmail = React.lazy(() => import('./pages/VerifyEmail'));
import ProtectedRoute from './components/ProtectedRoute';


function AppRoutes() {
  const auth = useContext(AuthContext);
  const userId = auth.user?.id;
  const adminLevel = auth.user?.isAdmin;

  return (
    <Suspense
        fallback={
          <Flex justify="center" align="center" mt={20}>
            <Spinner
              speed="0.6s"
              thickness="4px"
              colorScheme="green"
              size="xl"
            />
          </Flex>
        }
      >
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/auth" element={<Auth />} />

        <Route path="*" element={<div>Not Found</div>} />

        <Route element={<ProtectedRoute isAllowed={adminLevel} />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        
        <Route element={<ProtectedRoute isAllowed={userId} />}>
          <Route path="/view-items" element={<AllItems />} />
        </Route>
        
        <Route element={<ProtectedRoute isAllowed={userId} />}>
          <Route path="/order-history" element={<OrderHistory />} />
        </Route>
        
        <Route element={<ProtectedRoute isAllowed={userId} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        
        <Route element={<ProtectedRoute isAllowed={userId} />}>
          <Route path="/cart" element={<CurrentOrder />} />
        </Route>
        
        <Route element={<ProtectedRoute isAllowed={userId} />}>
          <Route path="/incoming-orders" element={<IncomingOrders />} />
        </Route>
        
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;