import React, { useEffect, useState } from 'react'
import './ProductDetail.css'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import pet_image from '/assets/pitbull.png';
import not_found from "/assets/not-found.png"
import { Breadcrumb, Button, message, Pagination, Rate, Skeleton, Spin } from 'antd';
import {
    ShoppingCartOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/actions/products.action';
import { getUserFromToken } from '../../utils/Token';
import { cartApi } from '../../apis/cart.request';
import { getAllReview } from '../../redux/actions/comment.action';

const ProductDetail = () => {
    const location = useLocation();  // Lấy dữ liệu thú cưng từ state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useParams().id;
    const { message: errorMessage, user } = getUserFromToken()

    const [currentCommentPage, setCurrentCommentPage] = useState(1);
    const [selectedRating, setSelectedRating] = useState(null);
    const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false);
    const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [callback, setCallback] = useState(false);


    useEffect(() => {
        dispatch(getProductById(id));
    }, []);

    useEffect(() => {
        dispatch(getAllReview(id));
    }, [callback]);

    const { payload: product, isLoading, error } = useSelector((state) => state.productsReducer);
    const { payload: reviews, isLoading: isLoadingReview } = useSelector((state) => state.commentReducer);

    // Kiểm tra nếu không có dữ liệu thú cưng, chuyển hướng lại trang chính
    // if (!location.state || !location.state.product) {
    //     navigate('/');
    //     return null;
    // }

    // const product = location.state.product;  // Dữ liệu thú cưng được truyền từ Product.jsx


    // if (isLoadingReview) {
    //     return <div>Đang tải bình luận...</div>; // Hoặc một loading spinner
    // }

    // // Kiểm tra nếu không có dữ liệu reviews, hiển thị thông báo
    // if (!reviews) {
    //     return <div>Không có bình luận nào.</div>;
    // }

    const pageSize = 5;

    // const filteredComments = selectedRating == null
    //     ? product.comments // Nếu selectedRating là null thì hiện tất cả comment
    //     : product.comments.filter(comment => comment.rating == selectedRating);
    const filteredComments = /*product.comments*/reviews.filter(comment => {
        return (
            (selectedRating !== null && selectedRating !== undefined ? comment.rating === selectedRating : true)
        );
    })

    const paginatedComments = /*product.comments*/filteredComments.slice(
        (currentCommentPage - 1) * pageSize,
        currentCommentPage * pageSize
    );

    const handleChangePage = (page) => {
        setCurrentCommentPage(page);
        window.scrollTo(0, 725);
    }

    const handleFilterRating = (rating) => {
        setSelectedRating(rating);
        setCurrentCommentPage(1); // Reset lại trang về 1 khi lọc thay đổi
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncrease = (productQuantity) => {
        if (quantity < productQuantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleAddToCart = async () => {
        setIsLoadingAddToCart(true);
        try {
            if (user) {
                let cartItems = []; // Mặc định là giỏ hàng rỗng nếu không tìm thấy

                try {
                    const res = await cartApi.getAllCart("");
                    cartItems = res?.data?.data?.cartItems || [];
                } catch (error) {
                    if (error.response?.status !== 404) {
                        throw error;
                    }
                }
                const cartQuantity = cartItems.find(item => item.productId === product._id);
                if (cartQuantity && cartQuantity?.quantity + quantity > product.quantity) {
                    message.error("Số lượng mua vượt quá số lượng trong kho, hãy kiểm tra giỏ hàng của bạn!");
                    setIsLoadingAddToCart(false);
                    return
                }
                const cart = {
                    userId: user.id,
                    productId: product._id,
                    quantity: quantity,
                }

                await cartApi.addToCart(cart);
                setIsLoadingAddToCart(false);
                setQuantity(1);
                message.success('Thêm vào giỏ hàng thành công');
            } else {
                message.warning(errorMessage);
                setIsLoadingAddToCart(false);
            }
        } catch (error) {
            message.error(error.response.data.message);
            setIsLoadingAddToCart(false);
        }
    };

    const handleRate = (value) => {
        setRating(value)
    }

    const handleAddComment = async (e) => {
        e.preventDefault();
        console.log(e);

        setIsLoadingAddComment(true);
        try {
            setIsLoadingAddComment(false);
        } catch (error) {
            message.error(error.response.data.message);
            setIsLoadingAddComment(false);
        }
    }

    return (
        <div className='product_detail-container'>
            {isLoading &&
                <div className="not-found">
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    margin: 150,
                                    fontSize: 100,
                                    color: 'var(--color-btn-auth)'
                                }}
                                spin />
                        }
                    />
                </div>
            }
            {product ? (
                <>
                    <div className="back-to-products">
                        <Breadcrumb className='breadcrumb'
                            items={[
                                {
                                    title: <Link
                                        to="/product"
                                        className='b-title-1'
                                        state={{
                                            searchTerm: location.state?.searchTerm,
                                            scrollY: location.state?.scrollY,
                                            currentPage: location.state?.currentPage
                                        }}
                                    >
                                        <ShoppingCartOutlined /> Sản phẩm
                                    </Link>,
                                },
                                {
                                    title: <p to="" className='b-title-2'>{product.name}</p>,
                                },
                            ]}
                        />
                    </div>
                    <p className='title'>Sản phẩm</p>
                    <p className='sub-title'>❤️ Nơi cung cấp tất cả thú cưng cần❤️</p>
                    <div className="product_detail-height">
                        <div className="product_detail-left">
                            <img src={product.image.url} />
                            {/* <img src={pet_image} /> */}
                        </div>
                        <div className="product_detail-right">
                            <div className="product_detail-content">
                                <p className='product_detail-name'>{product.name}</p>
                                <p className='product-detail-description'><span>Mô tả: </span> {product.description} </p>
                                <p className='product_detail-code'> <span>Mã sản phẩm: </span>{product.code}</p>
                                <p className='product_detail-category'> <span>Phân loại: </span> {product.category}</p>
                                <p className='product_detail-support'><span>Hỗ trợ: </span> {product.supportPercentage}%</p>
                                <p className='product_detail-price'></p>
                                <div className='product_detail-rating'><span>Đánh giá: </span> &#160; <Rate allowHalf disabled value={product.averageRating} /></div>
                                <p className='product_detail-old_price'> <span>Giá: </span>{product.oldPrice.toLocaleString('vi-VN')} VNĐ</p>
                                <div className='product-detail-quantity_wanted'>
                                    <span>Số lượng: </span>
                                    <button onClick={() => handleDecrease()}>-</button>
                                    <p>{quantity}</p>
                                    <button onClick={() => handleIncrease(product.quantity)}>+</button>
                                </div>
                                <p className='product_detail-quantity'><span>Kho hàng còn: </span>{product.quantity}</p>
                                <div className="add_to_cart-btn">
                                    <button disabled={isLoadingAddToCart} onClick={() => handleAddToCart()}> {isLoadingAddToCart ? <LoadingOutlined style={{ marginRight: 10 }} /> : <></>}Thêm vào giỏ hàng </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rating-filter">
                        <Button
                            className={selectedRating === null ? "rating-filter-btn active" : ""}
                            onClick={() => handleFilterRating(null)}
                        >
                            Tất cả bình luận
                        </Button>
                        <Button
                            className={selectedRating === 0 ? "rating-filter-btn active" : ""}
                            onClick={() => handleFilterRating(0)}
                        >
                            ⭐️ 0
                        </Button>
                        <Button
                            className={selectedRating === 1 ? "rating-filter-btn active" : ""}
                            onClick={() => handleFilterRating(1)}
                        >
                            ⭐️ 1
                        </Button>
                        <Button
                            className={selectedRating === 2 ? "rating-filter-btn active" : ""}
                            onClick={() => handleFilterRating(2)}
                        >
                            ⭐️ 2
                        </Button>
                        <Button
                            className={selectedRating === 3 ? "rating-filter-btn active" : ""}
                            onClick={() => handleFilterRating(3)}
                        >
                            ⭐️ 3
                        </Button>
                        <Button
                            className={selectedRating === 4 ? "rating-filter-btn active" : "rating-filter-btn"}
                            onClick={() => handleFilterRating(4)}
                        >
                            ⭐️ 4
                        </Button>
                        <Button
                            className={selectedRating === 5 ? "rating-filter-btn active" : "rating-filter-btn"}
                            onClick={() => handleFilterRating(5)}
                        >
                            ⭐️ 5
                        </Button>
                    </div>

                    <div className="list-comment">
                        {isLoadingReview ? (
                            <Skeleton
                                avatar
                                paragraph={{
                                    rows: 2,
                                }}
                            />
                        ) :
                /*product.comments*/filteredComments.length > 0 ? (
                    /*product.comments*/paginatedComments.map((comment) => (
                            <div key={comment._id} className="comment-item">
                                <img src={'https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg'} className="comment-user-img" />
                                <div className="comment-text">
                                    <p className='comment-username'>{comment.userName}</p>
                                    <div className="comment-user-rating">
                                        <Rate disabled value={comment.rating} />
                                    </div>
                                    <p className='comment-user-content'>{comment.comment}</p>
                                </div>
                            </div>
                        ))
                            ) : (
                                <p className='no-comment'>Chưa có nhận xét nào</p>
                            )}
                        <Pagination
                            current={currentCommentPage}
                            // total={product.comments.length}
                            total={filteredComments.length}
                            pageSize={pageSize}
                            showSizeChanger={false}
                            showQuickJumper
                            showTotal={(total) => `Tổng: ${total} bình luận`}
                            onChange={handleChangePage}
                            style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '3%',
                                paddingBottom: "40px",
                                fontFamily: "Inter, san-serif",
                                fontSize: "17px"
                            }}
                        />
                    </div>
                </>
            ) : !isLoading && (<>
                <div className="not-found">
                    <img src={not_found} />
                </div>
            </>)}

            {/* <form className='comment' onSubmit={handleAddComment}>
                <div className='comment-rating'>Đánh giá: &ensp; <Rate value={rating} onChange={handleRate}/></div>
                <textarea
                    maxLength={100}
                    placeholder='Gửi nhận xét của bạn về sản phẩm của chúng tôi'
                />
                <div className="send-comment-btn">
                    <button type='submit' id='commetn'>
                        Gửi nhận xét
                    </button>
                </div>
            </form> */}
        </div>
    )
}

export default ProductDetail