import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout.js';
import Home from './Home.js';
import Customer from './Customer.js';
import CustomerOrder from './CustomerOrder.js';
import NoPage from './NoPage.js';

function App() {
  const [loginData, setLogin] = useState({
    isLogin: false,
    customerId: '1'
  });
  const [customer, setCustomer] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchCustomer = (id) => {
    console.log("FETCH CUSTOMER", id);
    fetch("http://localhost:8080/customers/"+id)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCustomer(data);
      })
  }

  const fetchOrders = (id) => {
    console.log("FETCH ORDERS", id);
    fetch("http://localhost:8080/customers/"+id+"/orders")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setOrders(data);
      })
  }

  useEffect(() => {
    if(!loginData.isLogin) {
      // if logout clear customer data
      setCustomer([])
    }
  }, [loginData])

  return (
    <BrowserRouter>
      <Routes>
        {/* main layout */}
        <Route path="/" element={<Layout loginData={loginData} />}>
          {/* home page */}
          <Route index element={<Home loginData={loginData} setLogin={setLogin}/>} />
          {/* customer */}
          <Route path="customer/:id/orders" element={<CustomerOrder orders={orders} fetchOrders={fetchOrders} />} />
          <Route path="customer/:id" element={<Customer customer={customer} fetchCustomer={fetchCustomer} />} />
          {/* handle not found page */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
