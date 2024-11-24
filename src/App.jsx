import { Route, Routes } from 'react-router-dom'
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
import AdoptionForm from './components/Pet/AdoptionForm'
import UserProfile from './components/User/UserProfile/UserProfile'
import AdoptionFormHistory from './components/User/AdoptionForm/AdoptionFormHistory'
import AdoptionFormInfo from './components/User/AdoptionForm/AdoptionFormInfo'
import OrderHistoryList from './components/User/OrderHistory/OrderHistoryList'
import OrderHistoryInfo from './components/User/OrderHistory/OrderHistoryInfo'

function App() {
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

        {/* User */}
        <Route path='/user/*' element={<User />}>
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="adoption-form-history" element={<AdoptionFormHistory/>}/>
          <Route path="adoption-form-history/:id" element={<AdoptionFormInfo/>}/>
          <Route path="order-history-list" element={<OrderHistoryList/>}/>
          <Route path="order-history-list/:id" element={<OrderHistoryInfo/>}/>
        </Route>

        {/* Admin */}
        <Route
          path="/admin/*"
          element={<Admin />}
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
      </Routes>
    </>
  )
}

export default App
