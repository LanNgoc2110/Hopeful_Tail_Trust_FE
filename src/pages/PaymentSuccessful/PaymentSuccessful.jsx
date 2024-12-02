import React, { useEffect, useState } from 'react'
import './PaymentSuccessful.css'
import check_img from '/assets/checked.png'
import {
    LoadingOutlined
} from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import product_img from '/assets/clear-dogfood.png'
import { invoiceApi } from '../../apis/invoice.request'
import { productApi } from '../../apis/product.request'
import { Spin } from 'antd'

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
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const orderCode = queryParams.get('orderCode');

    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchOrder = async () => {
            try {
                const res = await invoiceApi.getOrderByOrderCode(orderCode);
                setOrder(res.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }

        const fetchProduct = async () => {
            try {
                const res = await productApi.getAllProducts()
                setProducts(res.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProduct();
        fetchOrder();
    }, []);

    // console.log(order.cartItem);


    return (
        <div className='payment_successful-whole-container'>
            {loading ? (
                <div className='payment_successful-loading'>
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    fontSize: 100,
                                    color: 'var(--color-btn-auth)'
                                }}
                                spin />
                        }
                    />
                </div>
            ) : (
                <div className="payment_successful-container">
                    <button onClick={() => navigate('/')}> &#60; &#160; Về trang chủ</button>

                    <h1 className="title">❣️ Cảm ơn bạn đã thanh toán! ❣️ </h1>
                    <p className='content'>
                        Đơn hàng của quý khách với mã số {orderCode} đã được thanh toán thành công vào {order?.createdAt}.
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
                            <p>{order?.lastName}</p>
                        </div>

                        <div className="invoice-content">
                            <p>Mã đơn hàng:</p>
                            <p>{order?.orderCode}</p>
                        </div>

                        <div className="invoice-content">
                            <p>Thời gian thanh toán:</p>
                            <p>{order?.createdAt}</p>
                        </div>

                        <div className="invoice-content">
                            <p>Số tiền thanh toán:</p>
                            <p>{order?.totalAmount} VND</p>
                        </div>

                        <div className="invoice-content">
                            <p>Số điện thoại:</p>
                            <p>{order?.phoneNumber}</p>
                        </div>
                        <div className="invoice-content">
                            <p>Địa chỉ: </p>
                            <p>{order?.street}, {order?.ward}, {order?.district}, {order?.city}</p>
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
                                {order?.cartItem.filter(product => product.category === 'Thức ăn').map((product) => {
                                    const tmpProduct = products.find(tmpProduct => tmpProduct.id === product.productId);
                                    return (
                                        <tr key={product._id}>
                                            <td>
                                                <img src={tmpProduct?.image?.url} alt="product" />
                                                <p>{tmpProduct?.name}</p>
                                            </td>
                                            <td>{product.quantity}</td>
                                            <td>{(tmpProduct?.price * product.quantity).toLocaleString('vi-VN')} VND</td>
                                        </tr>
                                    )
                                })}

                                <tr className='category-title'>
                                    <th colSpan={3}>Vật dụng</th>
                                </tr>
                                {order?.cartItem.filter(product => product.category === 'Vật dụng').map((product) => {
                                    const tmpProduct = products.find(tmpProduct => tmpProduct.id === product.productId);
                                    return (
                                        <tr key={product._id}>
                                            <td>
                                                <img src={tmpProduct?.image?.url} alt="product" />
                                                <p>{tmpProduct?.name}</p>
                                            </td>
                                            <td>{product.quantity}</td>
                                            <td>{(tmpProduct?.price * product.quantity).toLocaleString('vi-VN')} VND</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentSuccessful