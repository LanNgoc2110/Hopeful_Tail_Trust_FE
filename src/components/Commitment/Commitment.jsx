import React from 'react'
import './Commitment.css'

import content_img from '/assets/spyware-detection.png'
import product_img from '/assets/keylogger-detection.png'
import support_img from '/assets/find-tracking-apps.png'

const Commitment = () => {

    const listCommitment = [
        {
            id: 1, 
            img: content_img,
            title: 'Nội dung',
            content: <p>Nội dung chất lượng, <br/>
                        chính xác, có nguồn <br/>
                        uy tín.</p>
        },
        {
            id: 2, 
            img: product_img,
            title: 'Sản phẩm',
            content: <p>Sản phẩm gợi ý công bằng, <br/>
                        được phân tích review chi <br/>
                        tiết, chính xác.</p>
        },
        {
            id: 3, 
            img: support_img,
            title: 'Hỗ trợ',
            content: <p>Hỗ trợ hết mình, hướng <br/>
                        dẫn những nguồn khám <br/>
                        bệnh thú cưng uy tín, <br/>
                        chất lượng.</p>
        }
    ]

    return (
        <div className='commitment-container'>
            <p className='title'>Cam kết</p>
            <p className='content'>Hopeful Tails Trust được định hình là trang web thông tin về việc nhận nuôi thú cưng cơ nhỡ, bị bỏ rơi. Chúng tôi cam kết tất cả nội dung cung cấp trên trang <br />
                đầu đều được trích dịch từ các nguồn web nước ngoài rõ ràng, có ý kiến và trích dẫn thú y. Từ đó mang lại những giải pháp khách quan nhất cho mọi người.</p>
            <div className="board">
                {listCommitment.map((item) => (
                    <div className="board-content" key={item.id}>
                        <img src={item.img}/>
                        <p className='sub-title'>{item.title}</p>
                        <p className='sub-content'>{item.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Commitment