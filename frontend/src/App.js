import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './style.css';
import { AuthProvider } from './context/auth-context';
import { ItemsProvider } from './context/items-context';

const Auth = React.lazy(() => import('./pages/Auth'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const CurrentOrder = React.lazy(() => import('./pages/CurrentOrder'));
const IncomingOrders = React.lazy(() => import('./pages/IncomingOrders'));
const AllItems = React.lazy(() => import('./pages/AllItems'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Admin = React.lazy(() => import('./pages/Admin'));
const ProtectedRoute = React.lazy(() => import('./components/ProtectedRoute'));

export default function App() {

  return (
    <ChakraProvider>
      <AuthProvider> 
        <ItemsProvider>
          <Router>
            <NavBar />
            <React.Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/view-items" element={<AllItems />} />
                <Route path="*" element={<div>Not Found</div>} />

                {/* <Route element={ProtectedRoute} isAllowed={userId} >  */}
                  <Route path="/cart" element={<CurrentOrder />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* <Route element={ProtectedRoute} isAllowed={isAdmin} >  */}
                    <Route path="/incoming-orders" element={<IncomingOrders />} />
                    <Route path="/admin" element={<Admin />} />
                  {/* </Route> */}
                {/* </Route> */}
              </Routes>
            </React.Suspense>
          </Router>
        </ItemsProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}


