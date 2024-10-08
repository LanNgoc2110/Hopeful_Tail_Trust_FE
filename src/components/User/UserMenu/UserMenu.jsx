import React, { useEffect, useState } from 'react'
import './UserMenu.css'

import logo from "/assets/Logo.png"
import user_profile_icon from "/assets/user.png"
import form_icon from "/assets/form.png"
import order_icon from "/assets/checklist.png"
import { useLocation, useNavigate } from 'react-router-dom'

const UserMenu = () => { 
  const navigate = useNavigate();

  const listBtn = [
    {
      id: 1,
      img: user_profile_icon,
      title: "Thông tin cá nhân",
    },
    {
      id: 2,
      img: form_icon,
      title: "Đơn xin nhận nuôi",
    },
    {
      id: 3,
      img: order_icon,
      title: "Đơn hàng",
    },
  ]

 
  const [activeButton, setActiveButton] = useState(null); 

  const handleButtonClick = (buttonIndex) => {
    if (buttonIndex === 2) {
      navigate('/user/kid-profile');
    } else {
      
    }
    setActiveButton(buttonIndex);

    if (buttonIndex === 1) {
      navigate('/user/user-profile');
    } else {
    }

    if (buttonIndex === 3){
      navigate('/user/order')
    }
  }

  // khi người dùng có reload lại trang thì đang ở component nào thì nút đó sẽ phát sáng
  const location = useLocation()
  
  useEffect(() => {
    if(location.pathname === '/user/user-profile'){
      setActiveButton(1)
    }
    if(location.pathname === '/user/kid-profile'){
      setActiveButton(2)
    }
    if(location.pathname === '/user/order'){
      setActiveButton(3)
    }
  }, [location])

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
            >
              <div className="image-icon">
                <img src={item.img} />
              </div>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserMenu