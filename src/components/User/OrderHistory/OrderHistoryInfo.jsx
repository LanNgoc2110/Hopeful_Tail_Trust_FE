import React, { useEffect, useState } from 'react'
import './OrderHistoryInfo.css'
import { Breadcrumb, Button, Input, message, Modal, Rate, Tag } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import product_img from '/assets/clear-dogfood.png'
import { cartApi } from "../../../apis/cart.request";
import { productApi } from "../../../apis/product.request";
import optionStatusPayment from "../../../data/optionStatusPayment.json";
import { reviewApi } from '../../../apis/review.request';
import { getUserFromToken } from '../../../utils/Token';

const OrderHistoryInfo = () => {
    const location = useLocation();  // Lấy dữ liệu currentPage từ state
    const { user } = getUserFromToken()
    const order = location.state?.order;
    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);

    const [productId, setProductId] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [showRating, setShowRating] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [callback, setCallback] = useState(false);

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
                // console.log(response.data.data);

                // const cartItems = response?.data?.data || [];
                const cartFiltered = response?.data?.data?.cartItems.filter(item =>
                    order.cartItem.some(cartItem => cartItem == item._id)
                );
                // console.log(cartFiltered);
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

    const handleSetModal = async (id) => {
        const res = await reviewApi.getAllReview(id);
        // console.log(res.data.data);
        const reviews = res.data.data || [];

        if (reviews.length > 0) {
            const review = reviews.find(review => review.user == user.id);
            if (review) {
                message.error("Bạn đã đánh giá sản phẩm này rồi")
                setShowRating(false);
                return
            }
        }
        setProductId(id);
        setShowRating(true);
    }

    const handleComment = async () => {
        setConfirmLoading(true);
        try {
            const data = {
                rating: rating,
                comment: comment,
                productId: productId
            }
            // console.log(data);

            const response = await reviewApi.addReview(data);
            message.success("Đánh giá thành công");
            // console.log(response.data);
            setConfirmLoading(false);
            setShowRating(false);
            setProductId(null);
            setRating(0);
            setComment('');
            setCallback(!callback);
        } catch (error) {
            setConfirmLoading(false);
            console.error("Error adding review:", error);
        }
    }

    const handleCancel = () => {
        setShowRating(false);
        setProductId(null);
        setRating(0);
        setComment('');
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
                            <th >Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tổng Giá</th>
                            <th>Đánh giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.filter(product => product.category === 'Thức ăn').length > 0 && (
                            <tr className='category-title'>
                                <th colSpan={4}>Thức ăn</th>
                            </tr>
                        )}
                        {carts.filter(product => product.category === 'Thức ăn').map((product) => {
                            const productInfo = products.find(p => p.id === product.productId);
                            return (
                                <tr key={productInfo?.id}>
                                    <td>
                                        <img src={productInfo?.image?.url} alt="product" />
                                        <p>{productInfo?.name}</p>
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.subtotal.toLocaleString('vi-VN')} VND</td>
                                    <td>
                                        {order.status === 'Paid' && (
                                            <div className='order-rating-btn' key={productInfo?.id}>
                                                <Button type="primary" size='large' onClick={() => handleSetModal(productInfo?.id)}>Đánh giá</Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}

                        {carts.filter(product => product.category === 'Vật dụng').length > 0 && (
                            <tr className='category-title'>
                                <th colSpan={4}>Vật dụng</th>
                            </tr>
                        )}
                        {carts.filter(product => product.category === 'Vật dụng').map((product) => {
                            const productInfo = products.find(p => p.id === product.productId);
                            return (
                                <tr key={productInfo?.id}>
                                    <td>
                                        <img src={productInfo?.image?.url} alt="product" />
                                        <p>{productInfo?.name}</p>
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.subtotal.toLocaleString('vi-VN')} VND</td>
                                    <td>
                                        {order.status === 'Paid' && (
                                            <div className='order-rating-btn' key={productInfo?.id}>
                                                <Button type="primary" size='large' onClick={() => handleSetModal(productInfo?.id)}>Đánh giá</Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Modal
                    title="Đánh giá sản phẩm"
                    open={showRating}
                    onOk={handleComment}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <div className='comment-rating-order'>Đánh giá: &ensp; <Rate style={{ marginTop: 20 }} value={rating} onChange={(e) => setRating(e)} /></div>
                    <div className='comment-order'>
                        <Input.TextArea
                            style={{
                                height: 120,
                                margin: "20px 0"
                            }}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            maxLength={100}
                            placeholder='Gửi nhận xét của bạn về sản phẩm của chúng tôi'
                        />
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default OrderHistoryInfo