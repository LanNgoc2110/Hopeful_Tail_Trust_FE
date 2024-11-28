import React from 'react'
import './Slide.css'
import { Carousel } from 'antd';

import image_1 from '/assets/dog.png'
import image_2 from '/assets/labrador.png'
import image_3 from '/assets/dogs.png'
import image_4 from '/assets/cat.png'

const Slide = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <div className='slide-container'>
            <Carousel className="custom-carousel" autoplay autoplaySpeed={3000} arrows infinite={true}>
                <div className='slide'>
                    <img src={image_1} />
                    <div className="background-1"></div>
                    <div className="group-text-1">
                        <p className='title-1'>Hopeful Tails Trust</p>
                        <p className='content-1'>Niềm tin và hi vọng cho thú cưng!</p>
                    </div>
                </div>
                <div className='slide'>
                    <img src={image_2} />
                    <div className="background-2"></div>
                    <div className="group-text-2">
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
                <div className='slide'>
                    <img src={image_3} />
                    <div className="background-3"></div>
                    <p className='content-3'>"Tình yêu thú cưng không đơn thuần là sự đồng hành, mà là <br />
                        hứa hẹn với trái tim và trách nhiệm với linh hồn."
                    </p>
                </div>
                <div className='slide'>
                    <img src={image_4} />
                    <div className="background-4"></div>
                    <div className="group-text-4">
                        <p className='content-4'>"Yêu thương không giới hạn, chăm sóc không ngừng nghỉ <br /> <br />
                            Cùng nhau bảo vệ và chăm sóc những thành viên <br /> <br />
                            vô điều kiện của gia đình chúng ta."</p>
                        <button className='detail-btn'>Chi tiết</button>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}

export default Slide