import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '/assets/Logo.png'
import {
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/Token'
import { Avatar, Dropdown, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth.action'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const token = getToken();


    const handleClick = () => {
        navigate("/");
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }

    const [showHeader, setShowHeader] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    const controlHeader = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY < lastScrollY) { // Kiểm tra nếu người dùng cuộn lên. Nếu đúng, header sẽ được hiển thị
                setShowHeader(true)
            } else if (window.scrollY < 10) { // để khi component Header được gọi ở trang mới thì Header sẽ được hiện ra lần đầu tiên // nói cách khác, kiểm tra nếu người dùng ở gần đầu trang (khoảng cách cuộn từ trên cùng ít hơn 10px), header sẽ được hiển thị 
                setShowHeader(true)
            } else {
                setShowHeader(false)
            }
        }
        setLastScrollY(window.scrollY)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlHeader)

            return () => {
                window.removeEventListener('scroll', controlHeader)
            }
        }

    }, [lastScrollY])

    const handleLogout = () => {
        dispatch(logout())
        message.success("Đăng xuất thành công");
        navigate("/")
    }

    const items = [
        {
            label: "Cart",
            key: '1',
            icon: <ShoppingCartOutlined />,
            onClick: handleLogout,
        },
        {
            label: "Account",
            key: '2',
            icon: <UserOutlined />,
            onClick: handleLogout,
        },
        {
            label: "Log out",
            key: '3',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    return (
        <div className={`header-whole-container ${showHeader ? 'show' : ''}`} >
            <div className={`header-container ${showHeader ? 'show-down' : ''}`}>
                <div className="header-left">
                    <img src={logo} className='header-logo' onClick={handleClick} />
                </div>
                <div className="header-right">
                    <li
                        onClick={handleClick}
                        className={location.pathname == "/" ? "active" : ""}
                    >
                        Trang chủ
                    </li>
                    <li
                        onClick={() => {
                            navigate("/introduction")
                            window.scrollTo(0, 0);
                        }}
                        className={location.pathname == "/introduction" ? "active" : ""}
                    >
                        Giới thiệu
                    </li>
                    <li
                        onClick={() => {
                            navigate("/adoption")
                            window.scrollTo(0, 0);
                        }}
                        className={location.pathname == "/adoption" ? "active" : ""}
                    >
                        Nhận nuôi
                    </li>
                    <li
                        onClick={() => {
                            navigate("/product")
                            window.scrollTo(0, 0);
                        }}
                        className={location.pathname == "/product" ? "active" : ""}
                    >
                        Sản phẩm
                    </li>
                    {/* <li>Tin tức</li> */}
                    {/* <li
                        onClick={() => {
                            navigate("/donation")
                            window.scrollTo(0, 0);
                        }}
                        className={location.pathname == "/donation" ? "active" : ""}
                    >
                        Quyên góp
                    </li>
                    <li
                        onClick={() => {
                            navigate("/login")
                            window.scrollTo(0, 0);
                        }}
                    >
                        Đăng nhập
                    </li> */}
                    {token ? (
                        <Dropdown menu={{ items }} trigger={['click']} className='dropdown' >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <Avatar
                                        src={
                                            "https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg"
                                        }
                                        style={{ cursor: "pointer", width: '40px', height: '40px', marginRight: '20px' }}
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    ) : (
                        <li onClick={() => {
                            navigate("/login")
                            window.scrollTo(0, 0);
                        }}>Đăng nhập</li>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header