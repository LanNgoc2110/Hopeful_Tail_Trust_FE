import React from 'react'
import './CartPage.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Cart from '../../components/Cart/Cart'

const CartPage = () => {
  return (
    <div className='cart_page-whole-container'>
      <Header/>
      <div className="cart_page-container">
        <Cart/>
      </div>
      <Footer/>
    </div>
  )
}

export default CartPage