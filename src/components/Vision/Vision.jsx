import React from 'react'
import './Vision.css'

import image from '/assets/cat-vision.png'

const Vision = () => {
  return (
    <div className='vision-container'>
        <div className="vision-left">
            <img src={image}/>
        </div>
        <div className="vision-right">
            <p className='title'>Tầm nhìn</p>
            <p className='content'>Chúng tôi mong muốn Hopeful Tails Trust sẽ trở thành địa <br/>
                                    điểm tìm kiếm thông tin đáng tin cậy cho những người <br/>
                                    quan tâm và yêu thương động vật. Quan trọng hơn hết, <br/>
                                    Hopeful Tails Trust sẽ là người bạn đồng hành tin cậy với <br/>
                                    mọi người trong quá trình chăm sóc thú nuôi.
                                    <br/> <br/>
                                    Chúng tôi sẽ không ngừng nỗ lực và phát triển, phủ rộng <br/>
                                    thông tin đến mọi miền đất nước, đến những nơi cần chúng <br/>
                                    tôi trong hành trình nhận nuôi chăm sóc động vật, thú cưng <br/>
                                    cơ nhỡ,...
            </p>
        </div>
    </div>
  )
}

export default Vision