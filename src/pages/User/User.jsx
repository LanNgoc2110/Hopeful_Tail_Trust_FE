
import React, { useEffect, useState } from 'react'
import './User.css'
import UserMenu from '../../components/User/UserMenu/UserMenu'
import home from "/assets/home.png"
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
// import getUserLocalstorage from '../../utils/UserCurrent'

const User = () => {

  const navigate = useNavigate()

  // chỉ cần vào /user là tự động chuyển hướng sang /user/user-profile
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/user') {
      navigate('/user/user-profile')
    }
  }, [location, navigate])

//   const userCurrent = getUserLocalstorage();

  return (
    <div className="user-whole-container">
      <div className="user-container">
        <div className="user-left-container">
        <UserMenu />
        </div>
        <div className='user-right-container'>
          <img src={home} className='logo-home' onClick={() => navigate("/")} />
          <p className='welcome-user'>Hi, user
          {/* {userCurrent?.username} */}
          </p>

          <div className="info">
            {/* <Outlet /> */}
          </div>

        </div>
      </div>
    </div>
  )
}

export default User