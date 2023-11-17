import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './Components/Registration';
import ForgotPwd from './Components/ForgotPwd';
import Login from './Components/Login'
import Store from './Components/Store'
import Dashboard from './Components/Dashboard'
import Admin from './Components/Admin'
import ProductPage from './Components/ProductPage'
import Protected from './utils/Protected'
import Cart from './Components/Cart'
import CartUpdate from './Components/CartUpdate'
import Order from './Components/Order'
import AddProduct from './Components/AddProduct';
import UserUpdate from './Components/UserUpdate';
import OrderUpdate from './Components/OrderUpdate';

function App() {
  return (
    <div>


<BrowserRouter>
  <Routes>
 
  
      <Route path="/register" element={<Registration />} />
      <Route path="/forgotPwd" element={<ForgotPwd />} />
      <Route path="/dashboard/:productId" element={<ProductPage />} />     
      <Route path="/admin" element={<Admin />} />     
      <Route path="/cart" element={<Cart />} />     
      <Route path="/cart/:cartId" element={<CartUpdate />} />     
      <Route path="/order" element={<Order />} />     
      <Route path="/add-product" element={<AddProduct />} />     
      <Route path="/user-update" element={<UserUpdate />} />     
      <Route path="/order-update" element={<OrderUpdate />} />     

      <Route path="/" element={<Protected Component={Store} />} >     //parent route making protected and make child too protected, Props as comonent  
      
      <Route path="/login" element={<Login />} />      
      <Route path="/dashboard" element={<Dashboard />} />     
   
      </Route>

    

  </Routes>
</BrowserRouter>

    </div>
  );
}

export default App;

