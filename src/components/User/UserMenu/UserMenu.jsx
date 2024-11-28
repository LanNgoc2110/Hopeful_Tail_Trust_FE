import React, { useEffect, useState } from 'react'
import './UserMenu.css'

import logo from "/assets/Logo.png"
import user_profile_icon from "/assets/user.png"
import user_profile_icon_active from "/assets/user-active.png"
import form_icon from "/assets/form.png"
import form_icon_active from "/assets/form-active.png"
import order_icon from "/assets/checklist.png"
import order_icon_active from "/assets/checklist-active.png"
import donation_icon from "/assets/heart.png"
import donation_icon_active from "/assets/heart-active.png"
import { useLocation, useNavigate } from 'react-router-dom'

const UserMenu = () => { 
  const navigate = useNavigate();

  const listBtn = [
    {
      id: 1,
      img: user_profile_icon,
      activeImg: user_profile_icon_active,
      title: "Thông tin cá nhân",
    },
    {
      id: 2,
      img: form_icon,
      activeImg: form_icon_active,
      title: "Đơn xin nhận nuôi",
    },
    {
      id: 3,
      img: order_icon,
      activeImg: order_icon_active,
      title: "Lịch sử đơn hàng",
    },
    {
      id: 4,
      img: donation_icon,
      activeImg: donation_icon_active,
      title: "Lịch sử quyên góp",
    },
  ]

 
  const [activeButton, setActiveButton] = useState(null); 

  const handleButtonClick = (buttonIndex) => {
    if (buttonIndex === 2) {
      navigate('/user/adoption-form-history');
    } else {
      
    }
    setActiveButton(buttonIndex);

    if (buttonIndex === 1) {
      navigate('/user/user-profile');
    } else {
    }

    if (buttonIndex === 3){
      navigate('/user/order-history-list')
    }
    if (buttonIndex === 4){
      navigate('/user/donation-history-list')
    }
  }

  // khi người dùng có reload lại trang thì đang ở component nào thì nút đó sẽ phát sáng
  const location = useLocation()
  
  useEffect(() => {
    if(location.pathname === '/user/user-profile'){
      setActiveButton(1)
    }
    if(location.pathname === '/user/adoption-form-history'){
      setActiveButton(2)
    }
    if(location.pathname === '/user/order-history-list'){
      setActiveButton(3)
    }
    if(location.pathname === '/user/donation-history-list'){
      setActiveButton(4)
    }
  }, [location])

  const [hoveredButton, setHoveredButton] = useState(null);

  return (

    <div className="user_menu-container">

      <div className="image">
        <img src={logo}/>
      </div>

      <div className="list-btn">
        {listBtn.map((item) => (
          <div key={item.id} className='btn'>
            <div className={`btn-item ${activeButton === item.id ? 'choose' : ''}`}
              onClick={() => handleButtonClick(item.id)}
              onMouseEnter={() => setHoveredButton(item.id)} // Cập nhật khi hover
              onMouseLeave={() => setHoveredButton(null)}  // Xóa hover khi ra ngoài
            >
              <div className="image-icon">
                {/* <img src={activeButton === item.id ? item.activeImg : item.img}  /> */}
                <img 
                  src={hoveredButton === item.id || activeButton === item.id ? item.activeImg : item.img} 
                />
              </div>
              <p className={`btn-item-title ${activeButton === item.id ? 'title-choose' : ''}`}>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserMenu