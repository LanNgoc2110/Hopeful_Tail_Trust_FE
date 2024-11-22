import React from 'react'
import './PaymentPage.css'
import Payment from '../../components/Payment/Payment'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

const PaymentPage = () => {
  return (
    <div className='payment_page-whole-container'>
      <Header/>
      <div className="payment_page-container">
        <Payment/>
      </div>
      <Footer/>
    </div>
  )
}

export default PaymentPage