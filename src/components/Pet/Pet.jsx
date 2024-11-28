import React, { useEffect, useState } from 'react'
import './Pet.css'

import pet_image from '/assets/pitbull.png'
import { LoadingOutlined } from '@ant-design/icons';
import { Carousel, Input, Pagination, Select, Spin } from 'antd';
import not_found from "/assets/not-found.png"
import { useLocation, useNavigate } from 'react-router-dom';
import image_3 from '/assets/dogs.png'
import { petApi } from '../../apis/pet.request';

const { Search } = Input;

const Pet = () => {
    const listUnadoptedPets = [
        { id: 1, image: pet_image, name: 'an', gender: 'cái', species: 'chó', age: '5 tháng', vaccination: 1, health_status: 'Bình thường' },
        { id: 2, image: pet_image, name: 'will', gender: 'đực', species: 'chó', age: '3 tuổi', vaccination: 2, health_status: 'Thiếu dinh dưỡng' },
        { id: 3, image: pet_image, name: 'gạo', gender: 'đực', species: 'mèo', age: '2 tuổi', vaccination: 3, health_status: 'Viêm đường hô hấp' },
        { id: 4, image: pet_image, name: 'gạo', gender: 'đực', species: 'mèo', age: '1 tuổi', vaccination: 1, health_status: 'Bình thường' },
        { id: 5, image: pet_image, name: 'mimi', gender: 'cái', species: 'mèo', age: '4 tháng', vaccination: 0, health_status: 'Suy dinh dưỡng' },
        { id: 6, image: pet_image, name: 'bông', gender: 'đực', species: 'mèo', age: '6 tuổi', vaccination: 3, health_status: 'Bệnh ngoài da' },
        { id: 7, image: pet_image, name: 'nana', gender: 'đực', species: 'chó', age: '7 tháng', vaccination: 2, health_status: 'Bình thường' },
        { id: 8, image: pet_image, name: 'bông', gender: 'cái', species: 'chó', age: '8 tuổi', vaccination: 3, health_status: 'Viêm khớp' },
        { id: 9, image: pet_image, name: 'nana', gender: 'cái', species: 'chó', age: '1 tuổi', vaccination: 2, health_status: 'Bình thường' },
        { id: 10, image: pet_image, name: 'bé', gender: 'cái', species: 'chó', age: '2 tuổi', vaccination: 1, health_status: 'Thiếu dinh dưỡng' },
        { id: 11, image: pet_image, name: 'cún', gender: 'đực', species: 'chó', age: '5 tháng', vaccination: 0, health_status: 'Viêm phổi' },
        { id: 12, image: pet_image, name: 'bông', gender: 'cái', species: 'mèo', age: '6 tháng', vaccination: 1, health_status: 'Bệnh ngoài da' },
        { id: 13, image: pet_image, name: 'mập', gender: 'đực', species: 'mèo', age: '3 tuổi', vaccination: 2, health_status: 'Bình thường' },
        { id: 14, image: pet_image, name: 'bơ', gender: 'đực', species: 'mèo', age: '4 tháng', vaccination: 0, health_status: 'Suy dinh dưỡng' },
        { id: 15, image: pet_image, name: 'bé', gender: 'cái', species: 'mèo', age: '2 tuổi', vaccination: 1, health_status: 'Thiếu dinh dưỡng' },
        { id: 16, image: pet_image, name: 'cam', gender: 'cái', species: 'mèo', age: '5 tuổi', vaccination: 3, health_status: 'Bình thường' },
        { id: 17, image: pet_image, name: 'bé', gender: 'cái', species: 'chó', age: '7 tuổi', vaccination: 2, health_status: 'Viêm khớp' },
        { id: 18, image: pet_image, name: 'bông', gender: 'đực', species: 'mèo', age: '2 tuổi', vaccination: 1, health_status: 'Viêm đường hô hấp' },
        { id: 19, image: pet_image, name: 'cam', gender: 'cái', species: 'mèo', age: '3 tháng', vaccination: 0, health_status: 'Thiếu dinh dưỡng' },
        { id: 20, image: pet_image, name: 'bơ', gender: 'cái', species: 'chó', age: '6 tuổi', vaccination: 3, health_status: 'Bình thường' },
        { id: 21, image: pet_image, name: 'heo', gender: 'đực', species: 'mèo', age: '8 tuổi', vaccination: 2, health_status: 'Suy giảm miễn dịch' },
        { id: 22, image: pet_image, name: 'bé', gender: 'đực', species: 'chó', age: '4 tuổi', vaccination: 1, health_status: 'Bình thường' },
        { id: 23, image: pet_image, name: 'chồn', gender: 'cái', species: 'chó', age: '3 tháng', vaccination: 0, health_status: 'Suy dinh dưỡng' },
        { id: 24, image: pet_image, name: 'mun', gender: 'cái', species: 'mèo', age: '4 tuổi', vaccination: 2, health_status: 'Bệnh ngoài da' },
        { id: 25, image: pet_image, name: 'heo', gender: 'đực', species: 'chó', age: '5 tháng', vaccination: 0, health_status: 'Viêm phổi' },
        { id: 26, image: pet_image, name: 'mập', gender: 'đực', species: 'mèo', age: '8 tuổi', vaccination: 3, health_status: 'Bình thường' },
        { id: 27, image: pet_image, name: 'cún', gender: 'cái', species: 'chó', age: '2 tuổi', vaccination: 1, health_status: 'Thiếu dinh dưỡng' }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [speciesValue, setSpeciesValue] = useState(null)
    const [genderValue, setGenderValue] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [pets, setPets] = useState([])

    const onSearch = (value) => {
        setSearchTerm(value.trim().toLowerCase());
        setGenderValue(null);  // Reset gender select
        setSpeciesValue(null); // Reset species select
        setCurrentPage(1);     // Reset to the first page
    };

    const pageSize = 21;

    const filteredPets = /*listUnadoptedPets*/pets.filter(pet => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (!genderValue || pet.sex === genderValue) &&
            (!speciesValue || pet.species === speciesValue) &&
            (!searchTerm || pet.name.toLowerCase().includes(searchTermLower))
            // dành cho nút search có thể search tất cả
            // (
            //     !searchTerm ||
            //     pet.name.toLowerCase().includes(searchTermLower) ||
            //     pet.gender.toLowerCase().includes(searchTermLower) ||
            //     pet.species.toLowerCase().includes(searchTermLower)
            // )
        );
    });

    const paginatedPets = filteredPets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

    useEffect(() => {
        setIsLoading(true);
        const fetchDataPets = async () => {
            const response = await petApi.getAllPets()
            setPets(response.data.data || [])
            setIsLoading(false);
            // console.log(response);
        }
        fetchDataPets()
    }, [])

    return (
        <div className='pet-container'>
            <div className="pet-unadopted">
                <div className="pet-slide">
                    <img src={image_3} />
                    <div className="background-3"></div>
                    <p className='content-3'>"Tình yêu thú cưng không đơn thuần là sự đồng hành, mà là <br />
                        hứa hẹn với trái tim và trách nhiệm với linh hồn."
                    </p>
                </div>
                <div className="pet-filter">
                    <Search
                        placeholder="Tìm tên thú cưng"
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
                        placeholder="Tất cả loài"
                        value={speciesValue}
                        onChange={(value) => {
                            setSpeciesValue(value);
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
                            { value: 'Dog', label: 'Chó' },
                            { value: 'Cat', label: 'Mèo' },
                        ]}
                    />

                    <Select
                        showSearch
                        placeholder="Tất cả giới tính"
                        value={genderValue}
                        onChange={(value) => {
                            setGenderValue(value);
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
                            { value: 'Female', label: 'Cái' },
                            { value: 'Male', label: 'Đực' },
                        ]}
                    />
                </div>

                <div
                    className="pet-unadopted-list"
                    data-items={paginatedPets.length < 3 ? paginatedPets.length : 3}
                >
                    <p className='title'>Danh sách thú cưng</p>
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
                    {!isLoading && paginatedPets.length === 0 ? (
                        <div className="not-found">
                            <img src={not_found} />
                            <p className="no-pet">The pet you are looking for is currently not available.</p>
                        </div>
                    ) : (
                        paginatedPets.map((item) => (
                            <div className="pet-unadopted-item" key={item._id}>
                                <img src={item.image.url} />
                                <div className="overlay">
                                    <button
                                        className="view-more-button"
                                        onClick={() => navigate(`/adoption/${item._id}`, { state: { searchTerm, scrollY: window.scrollY, currentPage: currentPage } }, window.scrollTo(0, 0))}
                                    >
                                        Xem thêm
                                    </button>
                                </div>
                                <div className="pet-unadopted-item-info">
                                    <p>Tên: {item.name}</p>
                                    <p>Giới tính: {item.sex === 'Female' ? 'Cái' : 'Đực'}</p>
                                    <p>Loài: {item.species === 'Dog' ? 'Chó' : 'Mèo'}</p>
                                    {/* <p>Tiêm ngừa: {item.vaccination}</p>
                                    <p>Tình trạng sức khỏe: {item.health_status}</p> */}
                                </div>
                            </div>
                        ))
                    )}
                    <Pagination
                        current={currentPage}
                        // total={products.length}
                        total={filteredPets.length}
                        pageSize={pageSize}
                        showSizeChanger={false}
                        showQuickJumper
                        showTotal={(total) => `Total ${total} pets`}
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

                <div className="pet-adopted-list">
                    <p className='title'>Hình ảnh thú cưng được nhận nuôi</p>
                    <div className="pet-adopted-list-img">
                        {/* <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} /> */}
                        {/* <Carousel arrows infinite={true}>
                            <div className='slide'>
                                <img src={pet_image} />
                                <p>haha</p>
                            </div>
                            <div className='slide'>
                                <img src={pet_image} />
                            </div>
                            <div className='slide'>
                                <img src={pet_image} />
                            </div>
                            <div className='slide'>
                                <img src={pet_image} />
                            </div>
                        </Carousel> */}
                        <Carousel className="custom-carousel" arrows autoplay infinite={true}>
                            <div className='slide'>
                                <img src={pet_image} />
                                <img src={pet_image} />
                                <img src={pet_image} />
                            </div>
                            <div className='slide'>
                                <img src={pet_image} />
                                <img src={pet_image} />
                                <img src={pet_image} />
                            </div>
                            <div className='slide'>
                                <img src={pet_image} />
                                <img src={pet_image} />
                                <img src={pet_image} />
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pet