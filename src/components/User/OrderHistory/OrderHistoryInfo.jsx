import React, { useEffect, useState } from 'react'
import './OrderHistoryInfo.css'
import { Breadcrumb, Tag } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import product_img from '/assets/clear-dogfood.png'
import { cartApi } from "../../../apis/cart.request";
import { productApi } from "../../../apis/product.request";
import optionStatusPayment from "../../../data/optionStatusPayment.json";

const OrderHistoryInfo = () => {
    const location = useLocation();  // Lấy dữ liệu currentPage từ state
    const order = location.state?.order;
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    // console.log(order);

    const initialProducts = [
        { id: 1, name: 'Dry Food for Puppy', price: 500000, quantity: 1, img: product_img, category: 'food' },
        { id: 2, name: 'Scratching post', price: 120000, quantity: 1, img: product_img, category: 'essential' },
        { id: 3, name: 'Cat Litter', price: 250000, quantity: 1, img: product_img, category: 'essential' },
        { id: 4, name: 'Food and Water Bowls for Dog', price: 100000, img: product_img, quantity: 1, category: 'essential' },
        { id: 5, name: 'Dog Poop Bags', price: 130000, quantity: 1, img: product_img, category: 'essential' },
        { id: 6, name: 'Dry Food for Cat', price: 500000, quantity: 1, img: product_img, category: 'food' },
        { id: 7, name: 'Senior Dog Food', price: 450000, quantity: 1, img: product_img, category: 'food' },
    ];

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await cartApi.getAllCart("");
                console.log(response.data.data);

                // const cartItems = response?.data?.data || [];
                const cartFiltered = response?.data?.data?.cartItems.filter(item =>
                    order.cartItem.some(cartItem => cartItem == item._id)
                );
                console.log(cartFiltered);
                setCarts(cartFiltered);

            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }

        fetchCart();

        const fetchProduct = async () => {
            try {
                const res = await productApi.getAllProducts()
                setProducts(res.data.data);
                // console.log(res.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProduct();
    }, []);

    const renderStatus = (status) => {
        const matchedOption = optionStatusPayment.find(option => option.value === status);
        return matchedOption ? (
            <Tag color={matchedOption.color}>
                {matchedOption.label}
            </Tag>
        ) : (
            status
        );
    }

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
                            title: <p to="" className='b-title-2'>Hóa đơn {order.orderCode}</p>,
                        },
                    ]}
                />
            </div>
            <div className="order_history_info-invoice">
                <h1>Hoá đơn </h1>
                <div className="invoice-content">
                    <p>Tên người thanh toán:</p>
                    <p>{order.lastName}</p>
                </div>

                <div className="invoice-content">
                    <p>Mã đơn hàng:</p>
                    <p>{order.orderCode}</p>
                </div>

                <div className="invoice-content">
                    <p>Thời gian thanh toán:</p>
                    <p>{order.createdAt}</p>
                </div>

                <div className="invoice-content">
                    <p>Số tiền thanh toán:</p>
                    <p>{order.totalAmount.toLocaleString('vi-VN')} VND</p>
                </div>

                <div className="invoice-content">
                    <p>Số điện thoại:</p>
                    <p>{order.phoneNumber}</p>
                </div>
                <div className="invoice-content">
                    <p>Địa chỉ: </p>
                    <p>{order.street}, {order.ward}, {order.district}, {order.city}</p>
                </div>

                <div className="invoice-content">
                    <p>Trạng thái đơn hàng:</p>
                    <p className='status'>{renderStatus(order.status)}</p>
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
                        {carts.filter(product => product.category === 'Thức ăn').length > 0 && (
                            <tr className='category-title'>
                                <th colSpan={3}>Thức ăn</th>
                            </tr>
                        )}
                        {carts.filter(product => product.category === 'Thức ăn').map((product) => {
                            const productInfo = products.find(p => p.id === product.productId);
                            return (
                                <tr key={productInfo.id}>
                                    <td>
                                        <img src={productInfo.image?.url} alt="product" />
                                        <p>{productInfo.name}</p>
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.subtotal.toLocaleString('vi-VN')} VND</td>
                                </tr>
                            )
                        })}

                        {carts.filter(product => product.category === 'Vật dụng').length > 0 && (
                            <tr className='category-title'>
                                <th colSpan={3}>Vật dụng</th>
                            </tr>
                        )}
                        {carts.filter(product => product.category === 'Vật dụng').map((product) => {
                            const productInfo = products.find(p => p.id === product.productId);
                            return (
                                <tr key={productInfo.id}>
                                    <td>
                                        <img src={productInfo.image?.url} alt="product" />
                                        <p>{productInfo.name}</p>
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.subtotal.toLocaleString('vi-VN')} VND</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderHistoryInfo