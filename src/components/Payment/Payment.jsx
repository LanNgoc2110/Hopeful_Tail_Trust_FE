import React from 'react'
import './Payment.css'

const Payment = () => {
  return (
    <div className='payment-container'>
        <div className="payment-left">
            <p className='title'>Thanh toán</p>
        </div>
        <div className="payment-right">
            <p className='title'>Tổng đơn hàng</p>
        </div>
    </div>
  )
}

export default Payment