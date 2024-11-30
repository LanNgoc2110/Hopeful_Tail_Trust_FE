import React, { useEffect, useState } from 'react'
import './Header.css'
import logo from '/assets/Logo.png'
import {
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { getToken, getUserFromToken } from '../../utils/Token'
import { Avatar, Dropdown, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/auth.action'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const token = getToken();
    const { user } = getUserFromToken();


    const handleClick = () => {
        navigate("/");
        window.scrollTo(0, 0); // Cuộn lên đầu trang
    }

    const [showHeader, setShowHeader] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const controlHeader = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY < lastScrollY) { // Kiểm tra nếu người dùng cuộn lên. Nếu đúng, header sẽ được hiển thị
                setShowHeader(true)
            } else if (window.scrollY < 10) { // để khi component Header được gọi ở trang mới thì Header sẽ được hiện ra lần đầu tiên // nói cách khác, kiểm tra nếu người dùng ở gần đầu trang (khoảng cách cuộn từ trên cùng ít hơn 10px), header sẽ được hiển thị 
                setShowHeader(true)
            } else {
                setShowHeader(false)
            }
            setIsDropdownVisible(false);
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

    const itemsUser = [
        // {
        //     label: "Cart",
        //     key: '1',
        //     icon: <ShoppingCartOutlined />,
        //     onClick: () => { navigate('/cart') },
        // },
        {
            label: "Account",
            key: '2',
            icon: <UserOutlined />,
            onClick: () => { navigate('/user/user-profile') },
        },
        {
            label: "Log out",
            key: '3',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    const itemsAdmin = [
        {
            label: "Management",
            key: '1',
            icon: <UserOutlined />,
            onClick: () => {navigate('/admin/admin-home')},
        },
        {
            label: "Log out",
            key: '2',
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
                        className={location.pathname.startsWith("/adoption") ? "active" : ""}
                    >
                        Nhận nuôi
                    </li>
                    <li
                        onClick={() => {
                            navigate("/product")
                            window.scrollTo(0, 0);
                        }}
                        className={location.pathname.startsWith("/product") ? "active" : ""}
                    >
                        Sản phẩm
                    </li>
                    {/* <li>Tin tức</li> */}
                    <li
                        onClick={() => {
                            navigate("/donation")
                            window.scrollTo(0, 0);
                        }}
                        className={location.pathname == "/donation" ? "active" : ""}
                    >
                        Quyên góp
                    </li>
                    {/*
                    <li
                        onClick={() => {
                            navigate("/login")
                            window.scrollTo(0, 0);
                        }}
                    >
                        Đăng nhập
                    </li> */}
                    {token ? (
                        <>
                            <li
                                onClick={() => {
                                    navigate("/cart")
                                    window.scrollTo(0, 0);
                                }}
                                className={location.pathname.startsWith("/cart") ? "active" : ""}
                            >
                                <ShoppingCartOutlined />
                                {/* <div className="cart-quantity">
                                    1
                                </div> */}
                            </li>
                            <Dropdown menu={{ items: user.role == "user" ? itemsUser : itemsAdmin }} trigger={['click']} className='dropdown' placement='bottom'
                                open={isDropdownVisible} // Kiểm soát trạng thái dropdown
                                onOpenChange={(visible) => setIsDropdownVisible(visible)} // Cập nhật trạng thái
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <Avatar
                                            src={
                                                "https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg"
                                            }
                                            style={{ cursor: "pointer", width: '40px', height: '40px', marginRight: '0px' }}
                                        />
                                    </Space>
                                </a>
                            </Dropdown>
                        </>
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