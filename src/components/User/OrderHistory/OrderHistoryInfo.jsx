import React from 'react'
import './OrderHistoryInfo.css'
import { Breadcrumb } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import product_img from '/assets/clear-dogfood.png'

const OrderHistoryInfo = () => {
    const location = useLocation();  // Lấy dữ liệu currentPage từ state

    const initialProducts = [
        { id: 1, name: 'Dry Food for Puppy', price: 500000, quantity: 1, img: product_img, category: 'food' },
        { id: 2, name: 'Scratching post', price: 120000, quantity: 1, img: product_img, category: 'essential' },
        { id: 3, name: 'Cat Litter', price: 250000, quantity: 1, img: product_img, category: 'essential' },
        { id: 4, name: 'Food and Water Bowls for Dog', price: 100000, img: product_img, quantity: 1, category: 'essential' },
        { id: 5, name: 'Dog Poop Bags', price: 130000, quantity: 1, img: product_img, category: 'essential' },
        { id: 6, name: 'Dry Food for Cat', price: 500000, quantity: 1, img: product_img, category: 'food' },
        { id: 7, name: 'Senior Dog Food', price: 450000, quantity: 1, img: product_img, category: 'food' },
    ];

    return (
        <div className='order_history_info-container'>
            <div className="back-to-order_history_list">
                <Breadcrumb className='breadcrumb'
                    items={[
                        {
                            title: <Link
                                to="/user/order-history-list"
                                className='b-title-1'
                                state={{
                                    currentPage: location.state?.currentPage
                                }}
                            >
                                <ProfileOutlined /> Lịch sử đơn hàng
                            </Link>,
                        },
                        {
                            title: <p to="" className='b-title-2'>Hóa đơn HD00001</p>,
                        },
                    ]}
                />
            </div>
            <div className="order_history_info-invoice">
                <h1>Hoá đơn </h1>
                <div className="invoice-content">
                    <p>Tên người thanh toán:</p>
                    <p>Nguyễn Văn A</p>
                </div>

                <div className="invoice-content">
                    <p>Mã đơn hàng:</p>
                    <p>HD00001</p>
                </div>

                <div className="invoice-content">
                    <p>Thời gian thanh toán:</p>
                    <p>2023-01-01 22:34</p>
                </div>

                <div className="invoice-content">
                    <p>Số tiền thanh toán:</p>
                    <p>10.000.000 VND</p>
                </div>

                <div className="invoice-content">
                    <p>Số điện thoại:</p>
                    <p>0123456789</p>
                </div>
                <div className="invoice-content">
                    <p>Địa chỉ: </p>
                    <p>123 Nguyen Van A, Phường 1, Quận Bình Tân, TP.Thủ Đức</p>
                </div>

                <div className="invoice-content">
                    <p>Trạng thái đơn hàng:</p>
                    <p className='status'>Chưa giao</p>
                </div>

                <p>Các sản phẩm đã thanh toán: </p>
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='category-title'>
                            <th colSpan={3}>Thức ăn</th>
                        </tr>
                        {initialProducts.filter(product => product.category === 'food').map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.img} alt="product" />
                                    <p>{product.name}</p>
                                </td>
                                <td>{product.quantity}</td>
                                <td>{product.price.toLocaleString('vi-VN')} VND</td>
                            </tr>
                        ))}

                        <tr className='category-title'>
                            <th colSpan={3}>Vật dụng</th>
                        </tr>
                        {initialProducts.filter(product => product.category === 'essential').map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.img} alt="product" />
                                    <p>{product.name}</p>
                                </td>
                                <td>{product.quantity}</td>
                                <td>{product.price.toLocaleString('vi-VN')} VND</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistoryInfo