import React from 'react'
import './DonationSuccessful.css'
import check_img from '/assets/checked.png'
import { Link } from 'react-router-dom'

const DonationSuccessful = () => {
  return (
    <div className='donation_successful-whole-container'>
      <div className="donation_successful-container">
        <h1 className="title">❣️ Cảm ơn bạn đã thanh toán! ❣️ </h1>

        <div className="donation_successful-content">
          <div className="donation_successful-img">
            <img src={check_img} />
          </div>
          <p className="title">Thanh toán thành công</p>
          <p className="content">
            Chân thành cảm ơn bạn đã dành sự yêu thương và đóng góp
            quý giá cho các bạn chó mèo cần được cứu hộ. Sự ủng hộ của bạn không chỉ mang
            lại cơ hội sống tốt hơn cho các bạn nhỏ mà còn là nguồn động viên to lớn cho chúng
            tớ trên hành trình này.
          </p>
          <Link to="/" className="go-home-btn">
            <button>Quay về trang chủ</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DonationSuccessful