import React from 'react'
import './Vision.css'

import image from '/assets/cat-vision.png'
import image_2 from '/assets/labrador.png'

const Vision = () => {
  return (
    <div className='vision-container'>
      <div className='vision-slide'>
        <img src={image_2} />
        <div className="background-2"></div>
        <div className="vision-group-text-2">
          <p className='title-2'>Câu chuyện của chúng tôi</p>
          <p className='content-2'>Ở Việt Nam, vấn đề chó mèo bị bỏ rơi ngày càng trở nên nghiêm
            trọng. Tuy nhiên, việc thống kê chính xác số lượng chó mèo bị bỏ
            rơi là một thách thức lớn do thiếu các cơ quan quản lý và giám sát
            cụ thể. Một số nguồn tin từ các tổ chức bảo vệ động vật và trạm
            cứu hộ chó mèo cho thấy con số này đang ngày càng tăng, đặc
            biệt ở các thành phố lớn như Hà Nội và TP.HCM.
          </p>
          <button className='contact-us-btn'>Liên hệ với chúng tôi →</button>
        </div>
      </div>
      <div className="vision-content">
        <div className="vision-left">
          <img src={image} />
        </div>
        <div className="vision-right">
          <p className='title'>Tầm nhìn</p>
          <p className='content'>
            Chúng tôi mong muốn Hopeful Tails Trust sẽ trở thành địa
            điểm tìm kiếm thông tin đáng tin cậy cho những người
            quan tâm và yêu thương động vật. Quan trọng hơn hết,
            Hopeful Tails Trust sẽ là người bạn đồng hành tin cậy với
            mọi người trong quá trình chăm sóc thú nuôi.
            <br /> <br />
            Chúng tôi sẽ không ngừng nỗ lực và phát triển, phủ rộng
            thông tin đến mọi miền đất nước, đến những nơi cần chúng
            tôi trong hành trình nhận nuôi chăm sóc động vật, thú cưng
            cơ nhỡ,...
          </p>
        </div>
      </div>

    </div>
  )
}

export default Vision