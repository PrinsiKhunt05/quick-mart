import React from 'react'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Fotter from './Components/Fotter'
import { useAppContext } from './Context/AppContext'
import Login from './Components/Login'
import AllProduct from './Pages/AllProduct'
import ProductCatrgory from './Pages/ProductCatrgory'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import AddAddress from './Pages/AddAddress'
import MyOrder from './Pages/MyOrder'
import SellerLogin from './Pages/Seller/SellerLogin'
import SellerLayout from './Pages/Seller/SellerLayout'
import AddProduct from './Pages/Seller/AddProduct'
import AdminProfile from './Pages/Seller/AdminProfile'
import ProductList from './Pages/Seller/ProductList'
import Orders from './Pages/Seller/Orders'
import Loading from './Components/Loading'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'
import UserList from './Pages/Seller/UserList'

import { Box, Container } from '@mui/material'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, isSeller } = useAppContext()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      {!isSellerPath && <Navbar />}
      {showUserLogin && <Login />}
      <Toaster
        position="top-right"
        containerStyle={{
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
        }}
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: 'green',
              secondary: 'white',
            },
          },
          error: {
            iconTheme: {
              primary: 'red',
              secondary: 'white',
            },
          },
        }}
      />

      <Box 
        component="div" 
        sx={{ 
          flex: 1,
          px: isSellerPath ? 0 : { xs: 2, sm: 4, md: 8, lg: 12, xl: 16 }
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProduct />} />
          <Route path='/products/:category' element={<ProductCatrgory />} />
          <Route path='/products/:category/:id' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/add-address' element={<AddAddress />} />
          <Route path='/my-orders' element={<MyOrder />} />
          <Route path='/loader' element={<Loading />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<ContactUs/>} />

          {/* Seller Routes */}
          <Route path="/seller" element={<Navigate to="/seller/login" />} />
          <Route path="/seller/login" element={<SellerLogin />} />
          <Route path="/seller/dashboard" element={isSeller ? <SellerLayout /> : <Navigate to="/seller/login" />}>
            <Route index element={<AdminProfile/>} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="user-list" element={<UserList/>} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </Box>

      {!isSellerPath && <Fotter />}
    </Box>
  )
}

export default App
