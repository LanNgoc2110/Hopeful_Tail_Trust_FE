import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Introduction from './pages/Introduction/Introduction'
import Adoption from './pages/Adoption/Adoption'
import PetDetail from './components/Pet/PetDetail'
import Pet from './components/Pet/Pet'
import Products from './pages/Products/Products'
import Product from './components/Product/Product'
import ProductDetail from './components/Product/ProductDetail'
import User from './pages/User/User'

import Admin from './pages/Admin/Admin'
import ManageProduct from './components/Admin/Products/Product'
import ManagePet from './components/Admin/Pets/Pet'
import ManageNews from './components/Admin/News/News'
import Dashboard from './components/Admin/Revenue/Revenue'
import CartPage from './pages/CartPage/CartPage'
import PaymentPage from './pages/PaymentPage/PaymentPage'
import DonationPage from './pages/DonationPage/DonationPage'
import PaymentSuccessful from './pages/PaymentSuccessful/PaymentSuccessful'
import DonationSuccessful from './pages/DonationSuccessful/DonationSuccessful'
import AdoptionForm from './components/Pet/AdoptionForm'
import UserProfile from './components/User/UserProfile/UserProfile'
import AdoptionFormHistory from './components/User/AdoptionForm/AdoptionFormHistory'
import AdoptionFormInfo from './components/User/AdoptionForm/AdoptionFormInfo'
import OrderHistoryList from './components/User/OrderHistory/OrderHistoryList'
import OrderHistoryInfo from './components/User/OrderHistory/OrderHistoryInfo'
import VerifyEmail from './pages/VerifyEmail/VerifyEmail'
import DonationHistoryList from './components/User/DonationHistory/DonationHistoryList'
import { getUserFromToken } from './utils/Token'
import CheckRole from './pages/ErrorPage/CheckRole'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

function App() {
  const { token } = useSelector((state) => state.authReducer);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { user } = getUserFromToken();
    setUser(user);
  }, [token])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/adoption/*" element={<Adoption />}>
          <Route path="" element={<Pet />} />
          <Route path=":id" element={<PetDetail />} />
          <Route path=":id/adoption-form" element={<AdoptionForm />} />
        </Route>
        <Route path="/product/*" element={<Products />}>
          <Route path="" element={<Product />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmail />} />

        {/* User */}
        <Route path='/user/*' element={user?.role === 'user' ? <User /> : <Navigate to="/"/>}>
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="adoption-form-history" element={<AdoptionFormHistory />} />
          <Route path="adoption-form-history/:id" element={<AdoptionFormInfo />} />
          <Route path="order-history-list" element={<OrderHistoryList />} />
          <Route path="order-history-list/:id" element={<OrderHistoryInfo />} />
          <Route path="donation-history-list" element={<DonationHistoryList/>}/>
        </Route>

        {/* Admin */}
        <Route
          path="/admin/*"
          element={user?.role === 'admin' ? <Admin /> : <CheckRole authMessage="Chỉ admin mới có thể đăng nhập" />}
        >
          <Route path="admin-home" element={<Dashboard />} />
          <Route path="manage-product" element={<ManageProduct />} />
          <Route path="manage-pet" element={<ManagePet />} />
          <Route path="manage-news" element={<ManageNews />} />
        </Route>

        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/donation" element={<DonationPage />} />

        <Route path="/payment-successful" element={<PaymentSuccessful />} />
        <Route path="/donation-successful" element={<DonationSuccessful />} />
      </Routes>
    </>
  )
}

export default App
