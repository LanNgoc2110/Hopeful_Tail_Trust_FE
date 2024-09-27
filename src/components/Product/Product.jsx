import React, { useEffect, useState } from 'react'
import './Product.css'
import image_4 from '/assets/cat.png'
import product_img from '/assets/clear-dogfood.png'
import { Rate, Input, Pagination, Select } from 'antd';
import not_found from "/assets/not-found.png"
import { useLocation, useNavigate } from 'react-router-dom'; 
import avatar_img from '/assets/cat-introduce.png'

const { Search } = Input;

const Product = () => {
    const listProduct = [
        { 
            id: 1, 
            img: product_img, 
            name: 'Bát nước cho chó mèo', 
            price: 55000, 
            rating: 0, 
            description: 'Bát nước bằng nhựa nhẹ, tiện lợi cho thú cưng uống nước cả ngày.', 
            comments: [
                { userId: 1, username: 'user1', img: avatar_img, rating: 0, comment: 'Chất lượng không như mong đợi.' },
                { userId: 2, username: 'user2', img: avatar_img, rating: 1, comment: 'Giá rẻ nhưng chất lượng chưa ổn.' },
                { userId: 3, username: 'user1', img: avatar_img, rating: 0, comment: 'Chất lượng không như mong đợi.' },
                { userId: 4, username: 'user2', img: avatar_img, rating: 1, comment: 'Giá rẻ nhưng chất lượng chưa ổn.' },
                { userId: 5, username: 'user1', img: avatar_img, rating: 0, comment: 'Chất lượng không như mong đợi.' },
                { userId: 6, username: 'user2', img: avatar_img, rating: 1, comment: 'Giá rẻ nhưng chất lượng chưa ổn.' },
                { userId: 7, username: 'user1', img: avatar_img, rating: 0, comment: 'Chất lượng không như mong đợi.' },
                { userId: 8, username: 'user2', img: avatar_img, rating: 1, comment: 'Giá rẻ nhưng chất lượng chưa ổn.' },
                { userId: 9, username: 'user1', img: avatar_img, rating: 0, comment: 'Chất lượng không như mong đợi.' },
                { userId: 10, username: 'user2', img: avatar_img, rating: 1, comment: 'Giá rẻ nhưng chất lượng chưa ổn.' },
                { userId: 11, username: 'user1', img: avatar_img, rating: 0, comment: 'Chất lượng không như mong đợi.' },
                { userId: 12, username: 'user2', img: avatar_img, rating: 1, comment: 'Giá rẻ nhưng chất lượng chưa ổn.' },
            ]
        },
        { 
            id: 2, 
            img: product_img, 
            name: 'Đồ chơi bóng cao su', 
            price: 309000, 
            rating: 1.5, 
            description: 'Bóng cao su bền, dẻo, phù hợp cho chó mèo gặm nhấm và chơi đùa.', 
            comments: [
                { userId: 3, username: 'user3', img: avatar_img, rating: 1, comment: 'Chó của tôi rất thích chơi nhưng hơi nhanh hỏng.' },
                { userId: 4, username: 'user4', img: avatar_img, rating: 2, comment: 'Chất lượng khá ổn, phù hợp cho các loài chó lớn.' }
            ]
        },
        { 
            id: 3, 
            img: product_img, 
            name: 'Vòng cổ chống rận', 
            price: 382000, 
            rating: 2.5, 
            description: 'Vòng cổ chống rận với hương liệu tự nhiên, an toàn cho thú cưng.', 
            comments: [
                { userId: 5, username: 'user5', img: avatar_img, rating: 2, comment: 'Hiệu quả chống rận nhưng mùi hơi nồng.' }
            ]
        },
        { 
            id: 4, 
            img: product_img, 
            name: 'Lồng di động', 
            price: 251000, 
            rating: 4.5, 
            description: 'Lồng di động gọn nhẹ, thuận tiện khi mang thú cưng ra ngoài.', 
            comments: [
                { userId: 6, username: 'user6', img: avatar_img, rating: 4, comment: 'Rất tiện lợi khi đưa chó ra ngoài dạo.' }
            ]
        },
        { 
            id: 5, 
            img: product_img, 
            name: 'Cát vệ sinh mèo', 
            price: 68000, 
            rating: 4.0, 
            description: 'Cát vệ sinh có khả năng thấm hút tốt, giữ nhà sạch sẽ.', 
            comments: [
                { userId: 7, username: 'user7', img: avatar_img, rating: 4, comment: 'Thấm hút tốt, mèo của tôi rất thích.' }
            ]
        },
        { 
            id: 6, 
            img: product_img, 
            name: 'Thức ăn hạt cho chó', 
            price: 293000, 
            rating: 2.0, 
            description: 'Thức ăn hạt dinh dưỡng, hỗ trợ tăng trưởng cho chó.', 
            comments: [
                { userId: 8, username: 'user8', img: avatar_img, rating: 2, comment: 'Chó nhà tôi không ăn loại này.' }
            ]
        },
        { 
            id: 7, 
            img: product_img, 
            name: 'Dầu tắm cho thú cưng', 
            price: 58000, 
            rating: 3.0, 
            description: 'Dầu tắm dịu nhẹ, không gây kích ứng cho da thú cưng.', 
            comments: [
                { userId: 9, username: 'user9', img: avatar_img, rating: 3, comment: 'Tắm xong lông mềm mại nhưng hương thơm không giữ lâu.' }
            ]
        },
        { 
            id: 8, 
            img: product_img, 
            name: 'Bộ cắt móng', 
            price: 74000, 
            rating: 3.5, 
            description: 'Bộ cắt móng tiện dụng giúp cắt móng thú cưng dễ dàng và an toàn.', 
            comments: [
                { userId: 10, username: 'user10', img: avatar_img, rating: 3, comment: 'Cắt móng dễ dàng nhưng cần cẩn thận khi dùng.' }
            ]
        },
        { 
            id: 9, 
            img: product_img, 
            name: 'Áo khoác cho chó', 
            price: 318000, 
            rating: 2.0, 
            description: 'Áo khoác ấm áp cho thú cưng khi đi dạo trong thời tiết lạnh.', 
            comments: [
                { userId: 11, username: 'user11', img: avatar_img, rating: 2, comment: 'Chất liệu ổn nhưng hơi rộng với chó nhỏ.' }
            ]
        },
        { 
            id: 10, 
            img: product_img, 
            name: 'Dây dắt mèo', 
            price: 100000, 
            rating: 2.5, 
            description: 'Dây dắt an toàn, phù hợp cho cả chó và mèo.', 
            comments: [
                { userId: 12, username: 'user12', img: avatar_img, rating: 2, comment: 'Mèo của tôi không quen đeo dây dắt này.' }
            ]
        },
        { 
            id: 11, 
            img: product_img, 
            name: 'Nhà cho chó', 
            price: 239000, 
            rating: 1.0, 
            description: 'Nhà gỗ ấm áp, giúp giữ ấm cho thú cưng trong mùa đông.', 
            comments: [
                { userId: 13, username: 'user13', img: avatar_img, rating: 1, comment: 'Khá nhỏ so với kỳ vọng, chưa vừa với chó lớn.' }
            ]
        },
        { 
            id: 12, 
            img: product_img, 
            name: 'Bình nước di động', 
            price: 218000, 
            rating: 4.0, 
            description: 'Bình nước nhỏ gọn, tiện lợi cho thú cưng khi đi dạo.', 
            comments: [
                { userId: 14, username: 'user14', img: avatar_img, rating: 4, comment: 'Rất tiện dụng cho thú cưng khi ra ngoài.' }
            ]
        },
        { 
            id: 13, 
            img: product_img, 
            name: 'Giường nệm cho chó mèo', 
            price: 106000, 
            rating: 5.0, 
            description: 'Giường nệm mềm mại, mang lại cảm giác thoải mái cho thú cưng.', 
            comments: [
                { userId: 15, username: 'user15', img: avatar_img, rating: 5, comment: 'Giường rất mềm, thú cưng của tôi ngủ rất ngon.' }
            ]
        },
        { 
            id: 14, 
            img: product_img, 
            name: 'Đồ gặm cho chó', 
            price: 427000, 
            rating: 1.5, 
            description: 'Đồ gặm giúp làm sạch răng và ngăn ngừa hôi miệng cho thú cưng.', 
            comments: [
                { userId: 16, username: 'user16', img: avatar_img, rating: 1, comment: 'Sản phẩm nhanh bị hỏng, chó của tôi không thích.' }
            ]
        },
        { 
            id: 15, 
            img: product_img, 
            name: 'Cào móng cho mèo', 
            price: 55000, 
            rating: 4.5, 
            description: 'Dụng cụ cào móng cho mèo, bảo vệ đồ đạc trong nhà.', 
            comments: [
                { userId: 17, username: 'user17', img: avatar_img, rating: 4, comment: 'Mèo của tôi rất thích, không còn cào ghế nữa.' }
            ]
        },
        { 
            id: 16, 
            img: product_img, 
            name: 'Khay vệ sinh cho chó', 
            price: 87000, 
            rating: 3.5, 
            description: 'Khay vệ sinh dễ làm sạch, giúp giữ vệ sinh cho chó.', 
            comments: [
                { userId: 18, username: 'user18', img: avatar_img, rating: 3, comment: 'Chất lượng ổn, dễ làm sạch.' }
            ]
        },
        { 
            id: 17, 
            img: product_img, 
            name: 'Bàn chải lông thú cưng', 
            price: 93000, 
            rating: 3.0, 
            description: 'Bàn chải lông giúp loại bỏ lông rụng, giữ thú cưng sạch sẽ.', 
            comments: [
                { userId: 19, username: 'user19', img: avatar_img, rating: 3, comment: 'Chải khá tốt nhưng không loại bỏ hết lông rụng.' }
            ]
        },
        { 
            id: 18, 
            img: product_img, 
            name: 'Thảm ngủ cho chó', 
            price: 134000, 
            rating: 4.0, 
            description: 'Thảm ngủ mềm mại, giữ ấm cho chó vào ban đêm.', 
            comments: [
                { userId: 20, username: 'user20', img: avatar_img, rating: 4, comment: 'Chất liệu mềm mại và dễ giặt.' }
            ]
        },
        { 
            id: 19, 
            img: product_img, 
            name: 'Khăn tắm cho thú cưng', 
            price: 76000, 
            rating: 2.5, 
            description: 'Khăn tắm thấm hút tốt, giữ thú cưng khô ráo sau khi tắm.', 
            comments: [
                { userId: 21, username: 'user21', img: avatar_img, rating: 2, comment: 'Khá nhỏ và thấm hút chưa tốt.' }
            ]
        },
        { 
            id: 20, 
            img: product_img, 
            name: 'Dầu gội cho mèo', 
            price: 115000, 
            rating: 3.5, 
            description: 'Dầu gội nhẹ nhàng, không gây kích ứng cho da nhạy cảm của mèo.', 
            comments: [
                { userId: 22, username: 'user22', img: avatar_img, rating: 3, comment: 'Làm sạch tốt nhưng mùi thơm không giữ lâu.' }
            ]
        },
        { 
            id: 21, 
            img: product_img, 
            name: 'Khay ăn tự động', 
            price: 364000, 
            rating: 0.5, 
            description: 'Khay ăn tự động, đảm bảo thú cưng luôn được ăn đúng giờ.', 
            comments: [
                { userId: 23, username: 'user23', img: avatar_img, rating: 0, comment: 'Hoạt động không ổn định, thường bị lỗi.' },
                { userId: 24, username: 'user24', img: avatar_img, rating: 1, comment: 'Thiết kế đẹp nhưng tính năng không tốt.' }
            ]
        },
        { 
            id: 22, 
            img: product_img, 
            name: 'Túi vận chuyển thú cưng', 
            price: 415000, 
            rating: 4.5, 
            description: 'Túi vận chuyển thoải mái, giúp thú cưng dễ di chuyển khi đi xa.', 
            comments: [
                { userId: 25, username: 'user25', img: avatar_img, rating: 4, comment: 'Túi rất chắc chắn và thoáng khí.' }
            ]
        },
        { 
            id: 23, 
            img: product_img, 
            name: 'Đồ chơi gặm cho chó', 
            price: 243000, 
            rating: 3.5, 
            description: 'Đồ chơi giúp thú cưng giải trí và rèn luyện sức khỏe.', 
            comments: [
                { userId: 26, username: 'user26', img: avatar_img, rating: 3, comment: 'Chó của tôi rất thích chơi nhưng hơi nhanh hỏng.' }
            ]
        },
        { 
            id: 24, 
            img: product_img, 
            name: 'Bàn chải đánh răng cho chó', 
            price: 49000, 
            rating: 4.0, 
            description: 'Bàn chải đánh răng giúp làm sạch răng và ngăn ngừa hôi miệng.', 
            comments: [
                { userId: 27, username: 'user27', img: avatar_img, rating: 4, comment: 'Rất tiện lợi và dễ sử dụng.' }
            ]
        },
        { 
            id: 25, 
            img: product_img, 
            name: 'Đệm ngủ cho mèo', 
            price: 218000, 
            rating: 5.0, 
            description: 'Đệm ngủ mềm mại, giúp mèo ngủ ngon giấc.', 
            comments: [
                { userId: 28, username: 'user28', img: avatar_img, rating: 5, comment: 'Mèo nhà tôi rất thích nằm trên đệm này.' }
            ]
        },
        { 
            id: 26, 
            img: product_img, 
            name: 'Đèn pin cho thú cưng', 
            price: 67000, 
            rating: 2.5, 
            description: 'Đèn pin giúp tìm thú cưng trong bóng tối dễ dàng hơn.', 
            comments: []
        },
        { 
            id: 27, 
            img: product_img, 
            name: 'Đồ gặm cao su cho chó', 
            price: 189000, 
            rating: 3.5, 
            description: 'Đồ gặm bền, giúp chó rèn luyện răng miệng.', 
            comments: [
                { userId: 1, username: 'user1', img: avatar_img, rating: 3, comment: 'Chó của tôi rất thích nhưng hơi nhanh hỏng.' }
            ]
        },
        { 
            id: 28, 
            img: product_img, 
            name: 'Lược chải lông cho mèo', 
            price: 48000, 
            rating: 4.0, 
            description: 'Lược chải lông nhẹ nhàng, giúp loại bỏ lông rụng dễ dàng.', 
            comments: [
                { userId: 2, username: 'user2', img: avatar_img, rating: 4, comment: 'Mèo của tôi rất thích khi được chải lông.' }
            ]
        }
    ];
    

    const [searchTerm, setSearchTerm] = useState('');
    const [priceValue, setPriceValue] = useState(null)
    const [ratingValue, setRatingValue] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);

    const onSearch = (value) => {
        setSearchTerm(value.trim().toLowerCase());
        setPriceValue(null);  // Reset price select
        setRatingValue(null); // Reset rating select
        setCurrentPage(1);     // Reset to the first page
    };

    const pageSize = 21;

    const filteredProducts = listProduct.filter(product => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (!priceValue || (product.price >= priceValue[0] && product.price <= priceValue[1])) &&
            (ratingValue !== null && ratingValue !== undefined ? product.rating === ratingValue : true) &&
            (!searchTerm || product.name.toLowerCase().includes(searchTermLower))
            // dành cho nút search có thể search tất cả
            // (
            //     !searchTerm ||
            //     product.name.toLowerCase().includes(searchTermLower) ||
            //     product.price.toLowerCase().includes(searchTermLower) ||
            //     product.rating.toLowerCase().includes(searchTermLower)
            // )
        );
    })
        .sort((a, b) => a.price - b.price);


    const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleChangePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 750);
    }

    const navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        // Giữ từ tìm kiếm khi trở về từ trang chi tiết
        if (location.state && location.state.searchTerm) {
            setSearchTerm(location.state.searchTerm);
        }
        if (location.state && location.state.scrollY) {
            window.scrollTo(0, location.state.scrollY); // Cuộn đến vị trí lưu trước đó
        }
        if (location.state && location.state.currentPage) {
            setCurrentPage(location.state.currentPage); // Set the correct page
        }
    }, [location]);

    return (
        <div className='product-container'>
            <div className='product-slide'>
                <img src={image_4} />
                <div className="background-4"></div>
                <p className='content-4'>"Yêu thương không giới hạn, chăm sóc không ngừng nghỉ <br /> <br />
                    Cùng nhau bảo vệ và chăm sóc những thành viên <br /> <br />
                    vô điều kiện của gia đình chúng ta."</p>
                <button className='detail-btn'>Chi tiết</button>
            </div>
            <div className="product-filter">
                <Search
                    placeholder="Tìm tên sản phẩm"
                    value={searchTerm} // Giữ từ tìm kiếm
                    allowClear
                    // enterButton="Search"
                    enterButton
                    size="large"
                    style={{
                        width: '40%',
                    }}
                    onSearch={onSearch}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Select
                    showSearch
                    placeholder="Tất cả giá"
                    value={priceValue ? JSON.stringify(priceValue) : null}
                    // onChange={(value) => {
                    //     // setPriceValue(value);
                    //     setPriceValue(JSON.parse(value));
                    //     setCurrentPage(1);
                    // }}
                    onChange={(value) => {
                        if (value == null) {
                            // Nếu người dùng nhấn "clear", đặt giá trị về null
                            setPriceValue(null);
                        } else {
                            // Chuyển chuỗi JSON thành mảng
                            setPriceValue(JSON.parse(value));
                        }
                        setCurrentPage(1);
                    }}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    size="large"
                    allowClear
                    style={{
                        width: '14%',
                        // margin: '20px 20px 0'
                        marginLeft: '3%',
                    }}
                    options={[
                        { value: JSON.stringify([0, 250000]), label: '0 - 250.000 VNĐ' },
                        { value: JSON.stringify([250000, 500000]), label: '250.000 - 500.000 VNĐ' },
                        { value: JSON.stringify([500000, 750000]), label: '500.000 - 750.000 VNĐ' },
                        { value: JSON.stringify([750000, 1000000]), label: '750.000 - 1.000.000 VNĐ' }
                    ]}
                >
                    <Select.Option value="sample">Sample</Select.Option>
                </Select>

                <Select
                    showSearch
                    placeholder="Tất cả đánh giá"
                    value={ratingValue}
                    onChange={(value) => {
                        setRatingValue(value);
                        setCurrentPage(1);
                    }}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    size="large"
                    allowClear
                    style={{
                        width: '14%',
                        // margin: '20px 20px 0'
                        marginLeft: '20px',
                    }}
                    options={[
                        { value: 0, label: '⭐️ 0' },
                        { value: 0.5, label: '⭐️ 0.5' },
                        { value: 1, label: '⭐️ 1' },
                        { value: 1.5, label: ' ⭐️1.5' },
                        { value: 2, label: '⭐️ 2' },
                        { value: 2.5, label: '⭐️ 2.5' },
                        { value: 3, label: '⭐️ 3' },
                        { value: 3.5, label: '⭐️ 3.5' },
                        { value: 4, label: '⭐️ 4' },
                        { value: 4.5, label: '⭐️ 4.5' },
                        { value: 5, label: '⭐️ 5' }
                    ]}
                />
            </div>
            <div className="product-list">
                <p className='title'>Sản phẩm</p>
                <p className='sub-title'>❤️ Nơi cung cấp tất cả thú cưng cần❤️</p>
                {paginatedProducts.length === 0 ? (
                    <div className="not-found">
                        <img src={not_found} />
                        <p className="no-product">The product you are looking for is currently not available.</p>
                    </div>
                ) : (
                    paginatedProducts.map((item) => (
                        <div className="product-item" key={item.id}>
                            <img src={item.img} />
                            <div className="overlay">
                                <button
                                    className="view-more-button"
                                    onClick={() => navigate(`/product/${item.id}`, { state: { product: item, searchTerm, scrollY: window.scrollY, currentPage: currentPage } }, window.scrollTo(0, 0))}
                                >
                                    Xem thêm
                                </button>
                            </div>
                            <p className='product-name'>{item.name}</p>
                            <p className='product-price'>{item.price.toLocaleString('vi-VN')} VNĐ</p>
                            <Rate allowHalf disabled value={item.rating} />
                        </div>
                    ))
                )}

                <Pagination
                    current={currentPage}
                    // total={products.length}
                    total={filteredProducts.length}
                    pageSize={pageSize}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total) => `Total ${total} products`}
                    onChange={handleChangePage}
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        // marginLeft: "15%",
                        paddingBottom: "40px",
                        fontFamily: "Inter, san-serif",
                        fontSize: "17px"
                    }}
                />
            </div>
        </div>
    )
}

export default Product