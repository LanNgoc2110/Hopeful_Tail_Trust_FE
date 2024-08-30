import React from 'react'
import './BlogNews.css'

import image_1 from '/assets/cat1-news.png'
import image_2 from '/assets/cat2-news.png'
import image_3 from '/assets/dog-news.png'

const BlogNews = () => {
    const listBlogAndNews = [
        {
            id: 1,
            img: image_1,
            title: <div>Huấn luyện mèo <br />
                đi vệ sinh <br />
                đúng cách
            </div>,
            content: <div>Việc huấn luyện mèo sử <br />
                dụng khay vệ sinh không chỉ <br />
                giúp vệ sinh môi trường sống <br />
                mà còn tạo sự thoải mái cho <br />
                cả bạn và thú cưng của mình.
            </div>
        },
        {
            id: 2,
            img: image_2,
            title: <div>Khám phá những <br />
                giống mèo dễ <br />
                thương nhất hiện <br />
                nay</div>,
            content: <div>Khi nghĩ đến mèo, chúng ta <br />
                thường tưởng tượng những <br />
                sinh vật dễ thương, lém lỉnh <br />
                và đầy tình cảm. Mỗi giống <br />
                mèo sẽ có một nét đặc trưng <br />
                riêng.
            </div>
        },
        {
            id: 3,
            img: image_3,
            title: <div>Các bệnh thường <br />
                gặp ở chó Bull</div>,
            content: <div>Chó Bull, với vẻ ngoài mạnh mẽ <br />
                và tính cách thân thiện, luôn là <br />
                lựa chọn phổ biến của nhiều <br />
                gia đình yêu thú cưng. Tuy <br />
                nhiên, giống chó này cũng dễ <br />
                mắc phải một số bệnh lý đặc <br />
                trưng.
            </div>
        },
    ]
    return (
        <div className='blog_news-container'>
            <p className='title'>Blog and News</p>
            {listBlogAndNews.map((item) => (
                <div className="blog_news-content" key={item.id}>
                    <img src={item.img} />
                    <div className="blog_news-content-background">
                        <div className='sub-title'>{item.title}</div>
                        <div className='sub-content'>{item.content}</div>
                    </div>
                </div>
            ))}
            <div className="show_more">
                <button className='show_more-btn'>Xem thêm</button>
            </div>
        </div>
    )
}

export default BlogNews