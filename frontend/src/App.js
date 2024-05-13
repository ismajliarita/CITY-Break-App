import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './style.css';

const Auth = React.lazy(() => import('./pages/Auth'));

const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const CurrentOrder = React.lazy(() => import('./pages/CurrentOrder'));
const IncomingOrders = React.lazy(() => import('./pages/IncomingOrders'));
const AllItems = React.lazy(() => import('./pages/AllItems'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Profile = React.lazy(() => import('./pages/Profile'));

export default function App() {

  return (
    <ChakraProvider>
      <Router>
      <NavBar />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<CurrentOrder />} />
            <Route path="/view-items" element={<AllItems />} />
            <Route path="/incoming-orders" element={<IncomingOrders />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ChakraProvider>
  );
}


