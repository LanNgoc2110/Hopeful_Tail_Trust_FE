import React from 'react'
import './VerifyEmail.css'
import check_img from '/assets/checked.png'
import { Link } from 'react-router-dom'

const VerifyEmail = () => {
    return (
        <div className='verify-email-whole-container'>
            <div className="verify-email-container">
                <h1 className="title">✨ Xác nhận email của bạn! ✨ </h1>

                <div className="verify-email-content">
                    <div className="verify-email-img">
                        <img src={check_img} />
                    </div>
                    <p className="title">Hãy kiểm tra hộp thư email của bạn</p>
                    <p className="content">
                        Một email xác nhận sẽ được gửi tới địa chỉ email bạn đã đăng ký.
                        Vui lòng kiểm tra hộp thư (bao gồm cả mục spam/quảng cáo) và nhấp vào
                        liên kết trong email để hoàn tất quá trình xác thực tài khoản.
                         <br/> <br/>
                        Nếu bạn không nhận được email trong vài phút, hãy kiểm tra lại địa chỉ 
                        email hoặc thử gửi lại yêu cầu xác nhận.
                    </p>
                    {/* <p className='content'>
            Đơn hàng của quý khách với mã số XXXXX đã được thanh toán thành công vào lúc 21:39.
            Chúng tôi sẽ nhanh chóng xử lý và gửi hàng đến quý khách trong thời gian sớm nhất.
            Cảm ơn sự tin tưởng của quý khách!
          </p> */}
                    <Link to="/" className="verify-email-btn">
                        <button>Xác thực mail</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail