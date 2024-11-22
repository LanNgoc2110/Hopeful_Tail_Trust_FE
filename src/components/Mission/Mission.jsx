import React from 'react'
import './Mission.css'

import image from '/assets/mission.png'

const Mission = () => {
  return (
    <div className='mission-container'>
      <div className="mission-left">
        <p className='title'>Nhiệm vụ của chúng tôi</p>
        <p className='content'>
          Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng 
          thông tin khổng lồ và hoàn toàn miễn phí về vấn đề xung 
          quanh động vật, đặc biệt là thú cưng, cụ thể là vấn đề thú 
          cưng bị bỏ rơi, các thực phẩm dinh dưỡng dành cho thú 
          cưng, cách chăm sóc và điều trị bệnh cho chó mèo,...
          Tất cả những thông tin tại Hopeful Tails Trust được sưu tầm 
          và tham khảo từ nhiều nguồn khác nhau có chọn lọc, bên 
          cạnh đó còn là trải nghiệm thực tế của chúng tôi trong quá 
          trình nuôi thúc cưng để đem đến cho mọi người những 
          thông tin chính xác và hữu ích nhất.
        </p>
        {/* <button className='detail-btn'>Chi tiết</button> */}
      </div>
      <div className="mission-right">
        <img src={image} />
      </div>
    </div>
  )
}

export default Mission