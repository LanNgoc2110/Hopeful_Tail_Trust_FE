import React from 'react'
import './PaymentSuccessful.css'
import check_img from '/assets/checked.png'
import { Link, useNavigate } from 'react-router-dom'
import product_img from '/assets/clear-dogfood.png'

const PaymentSuccessful = () => {

    const initialProducts = [
        { id: 1, name: 'Dry Food for Puppy', price: 500000, quantity: 1, img: product_img, category: 'food' },
        { id: 2, name: 'Scratching post', price: 120000, quantity: 1, img: product_img, category: 'essential' },
        { id: 3, name: 'Cat Litter', price: 250000, quantity: 1, img: product_img, category: 'essential' },
        { id: 4, name: 'Food and Water Bowls for Dog', price: 100000, img: product_img, quantity: 1, category: 'essential' },
        { id: 5, name: 'Dog Poop Bags', price: 130000, quantity: 1, img: product_img, category: 'essential' },
        { id: 6, name: 'Dry Food for Cat', price: 500000, quantity: 1, img: product_img, category: 'food' },
        { id: 7, name: 'Senior Dog Food', price: 450000, quantity: 1, img: product_img, category: 'food' },
    ];
    const navigate = useNavigate();
    

    return (
        <div className='payment_successful-whole-container'>
            <div className="payment_successful-container">

                <button onClick={() => navigate('/')}> &#60; &#160; Về trang chủ</button>

                <h1 className="title">❣️ Cảm ơn bạn đã thanh toán! ❣️ </h1>
                <p className='content'>
                    Đơn hàng của quý khách với mã số XXXXX đã được thanh toán thành công vào lúc 21:39.
                </p>
                <p className='content'>
                    Chúng tôi sẽ nhanh chóng xử lý và gửi hàng đến quý khách trong thời gian sớm nhất.
                </p>
                <p className='content'>
                    Cảm ơn sự tin tưởng của quý khách!
                </p>

                <div className="payment_successful-invoice">
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
                        <p>123 Nguyen Van A, Phường 1, Quận Bình Tân, Thành phố Thủ Đức</p>
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
        </div>
    )
}

export default PaymentSuccessful