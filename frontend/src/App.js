import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react";
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import './style.css';


const CreateOrder = React.lazy(() => import('./pages/CreateOrder'));
const OrderHistory = React.lazy(() => import('./pages/OrderHistory'));
const IncomingOrders = React.lazy(() => import('./pages/IncomingOrders'));
const AllItems = React.lazy(() => import('./pages/AllItems'));
const HomePage = React.lazy(() => import('./pages/HomePage'));

export default function App() {

  return (
    <ChakraProvider>
      <Router>
      <NavBar />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/view-items" element={<AllItems />} />
            <Route path="/incoming-orders" element={<IncomingOrders />} />
            <Route path="/order-history" element={<OrderHistory />} />
          </Routes>
        </React.Suspense>
      </Router>
      {/* <AllItems /> */}
    </ChakraProvider>
  );
}


