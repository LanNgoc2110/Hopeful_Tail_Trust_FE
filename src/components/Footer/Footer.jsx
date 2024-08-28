import React from 'react'
import './Footer.css'

import twitter from '/assets/twitter.png'
import facebook from '/assets/facebook.png'
import youtube from '/assets/youtube.png'
import logo from '/assets/Logo_No_Word.png'

const Footer = () => {
    return (
        <div className="footer-whole-container">
            <div className='footer-container'>
                <div className="footer-left">
                    <p className='title'>Kết nối thông qua</p>
                    <div className="footer-contact">
                        <img src={twitter} className='footer-logo' />
                        <img src={facebook} className='footer-logo' />
                        <img src={youtube} className='footer-logo' />
                    </div>
                    <div className="policy">
                        <p>Chính sách</p>
                        <p>Điều khoản dịch vụ</p>
                    </div>
                    <p className='content'>Copyright © 2024 Hopeful Tail Trust Software Limited </p>
                    <p className='content'>Designed & developed by <u>Hopeful Tail Trust</u></p>
                </div>
                <div className="footer-middle">
                    <p className='title'>Hopeful Tails Trust</p>
                    <p className='content'> ── <span>Số điện thoại</span></p>
                    <p className='content'> ── <span>Mạng xã hội</span></p>
                </div>
                <div className="footer-right">
                    <div className="footer-register">
                        <p>Đăng ký để nhận thông tin mới nhất </p>
                        <button> 🫰 Đăng ký</button>
                        <img src={logo}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer