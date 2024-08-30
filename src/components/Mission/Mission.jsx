import React from 'react'
import './Mission.css'

import image from '/assets/mission.png'

const Mission = () => {
  return (
    <div className='mission-container'>
        <div className="mission-left">
            <p className='title'>Nhiệm vụ của chúng tôi</p>
            <p className='content'>Hopeful Tails Trust được xây dựng dựa trên tiêu chí cổng <br/>
                                thông tin khổng lồ và hoàn toàn miễn phí về vấn đề xung <br/>
                                quanh động vật, đặc biệt là thú cưng, cụ thể là vấn đề thú <br/>
                                cưng bị bỏ rơi, các thực phẩm dinh dưỡng dành cho thú <br/>
                                cưng, cách chăm sóc và điều trị bệnh cho chó mèo,...<br/>
                                Tất cả những thông tin tại Hopeful Tails Trust được sưu tầm <br/>
                                và tham khảo từ nhiều nguồn khác nhau có chọn lọc, bên <br/>
                                cạnh đó còn là trải nghiệm thực tế của chúng tôi trong quá <br/>
                                trình nuôi thúc cưng để đem đến cho mọi người những <br/>
                                thông tin chính xác và hữu ích nhất.</p>
            <button className='detail-btn'>Chi tiết</button>
        </div>
        <div className="mission-right">
            <img src={image}/>
        </div>
    </div>
  )
}

export default Mission