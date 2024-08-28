import React from 'react'
import './Header.css'
import logo from '/assets/Logo.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/");
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }
    return (
        <div className="header-whole-container">
            <div className='header-container'>
                <div className="header-left">
                    <img src={logo} className='header-logo' />
                </div>
                <div className="header-right">
                    <li onClick={handleClick}>Trang chủ</li>
                    <li>Giới thiệu</li>
                    <li>Nhận nuôi</li>
                    <li>Sản phẩm</li>
                    <li>Tin tức</li>
                    <li>Đăng nhập</li>
                </div>
            </div>
        </div>
    )
}

export default Header