import React, { useState } from 'react'
import {
    HomeFilled,
    SnippetsOutlined,
    ProductOutlined,
    BaiduOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { Avatar, Button, ConfigProvider, Dropdown, Layout, Menu, Space, message, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import './Admin.css'
import logo from '/assets/Logo.png'

const { Header, Sider, Content } = Layout;

const items = [
    {
        key: "home",
        icon: <HomeFilled />,
        label: "Trang chủ",
        route: "admin-home",
    },
    {
        key: "news",
        icon: <SnippetsOutlined />,
        label: "Quản lý tin tức",
        route: "manage-news",
    },
    {
        key: "pet",
        icon: <BaiduOutlined />,
        label: "Quản lý thú cưng",
        route: "manage-pet",
    },
    {
        key: "product",
        icon: <ProductOutlined />,
        label: "Quản lý sản phẩm",
        route: "manage-product",
    }
]

const customTheme = {
    token: {
        colorBgContainer: '#f0f2f5',
        colorPrimary: '#1DA57A',
        colorBgMenuItemSelected: '#E88E00', // Màu khi click (được chọn)
        colorBgMenuItemHover: '#E88E00', // Màu khi hover
    },
};

export default function Admin() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {
            colorBgContainer,
            borderRadiusLG
        },
    } = theme.useToken();

    const navigate = useNavigate()

    const handleMenuClick = (e) => {
        let selectedItem;

        items.forEach((item) => {
            if (item.key === e.key) {
                selectedItem = item;
            }
            if (item.children) {
                item.children.forEach((child) => {
                    if (child.key === e.key) {
                        selectedItem = child;
                    }
                });
            }
        });

        if (selectedItem?.route) {
            navigate(selectedItem.route);
        }
    };

    const handleLogout = () => {

    }

    const listDropdown = [
        {
            label: "Log out",
            key: '1',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    return (
        <Layout>
            <ConfigProvider theme={customTheme}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="header-admin">
                        {!collapsed ? <img src={logo} className='logo' /> : <></>}
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100vh' }}
                        onClick={handleMenuClick}
                        items={items}
                    />
                </Sider>
            </ConfigProvider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />

                    <Dropdown menu={{ items: listDropdown }} trigger={['click']} className='dropdown' >
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
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
