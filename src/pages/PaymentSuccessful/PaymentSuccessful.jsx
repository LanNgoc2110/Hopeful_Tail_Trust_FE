import React from 'react'
import './PaymentSuccessful.css'
import check_img from '/assets/checked.png'
import { Link } from 'react-router-dom'

const PaymentSuccessful = () => {
  return (
    <div className='payment_successful-whole-container'>
      <div className="payment_successful-container">
        <h1 className="title">❣️ Cảm ơn bạn đã thanh toán! ❣️ </h1>

        <div className="payment_successful-content">
          <div className="payment_successful-img">
            <img src={check_img} />
          </div>
          <p className="title">Thanh toán thành công</p>
          <p className="content">
            Chân thành cảm ơn bạn đã dành sự yêu thương và đóng góp
            quý giá cho các bạn chó mèo cần được cứu hộ. Sự ủng hộ của bạn không chỉ mang
            lại cơ hội sống tốt hơn cho các bạn nhỏ mà còn là nguồn động viên to lớn cho chúng
            tớ trên hành trình này.
          </p>
          {/* <p className='content'>
            Đơn hàng của quý khách với mã số XXXXX đã được thanh toán thành công vào lúc 21:39.
            Chúng tôi sẽ nhanh chóng xử lý và gửi hàng đến quý khách trong thời gian sớm nhất.
            Cảm ơn sự tin tưởng của quý khách!
          </p> */}
          <Link to="/" className="go-home-btn">
            <button>Quay về trang chủ</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccessful