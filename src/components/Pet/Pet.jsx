import React, { useState } from 'react'
import './Pet.css'

import image_3 from '/assets/dogs.png'
import pet_image from '/assets/pitbull.png'
import { Input, Pagination, Select } from 'antd';
import not_found from "/assets/not-found.png"

const { Search } = Input;

const Pet = () => {
    const listUnadoptedPets = [
        { id: 1, image: pet_image, name: 'an', gender: 'cái', species: 'chó' },
        { id: 2, image: pet_image, name: 'will', gender: 'đực', species: 'chó' },
        { id: 3, image: pet_image, name: 'gạo', gender: 'đực', species: 'mèo' },
        { id: 4, image: pet_image, name: 'gạo', gender: 'đực', species: 'mèo' },
        { id: 5, image: pet_image, name: 'mimi', gender: 'cái', species: 'mèo' },
        { id: 6, image: pet_image, name: 'bông', gender: 'đực', species: 'mèo' },
        { id: 7, image: pet_image, name: 'nana', gender: 'đực', species: 'chó' },
        { id: 8, image: pet_image, name: 'bông', gender: 'cái', species: 'chó' },
        { id: 9, image: pet_image, name: 'nana', gender: 'cái', species: 'chó' },
        { id: 10, image: pet_image, name: 'bé', gender: 'cái', species: 'chó' },
        { id: 11, image: pet_image, name: 'cún', gender: 'đực', species: 'chó' },
        { id: 12, image: pet_image, name: 'bông', gender: 'cái', species: 'mèo' },
        { id: 13, image: pet_image, name: 'mập', gender: 'đực', species: 'mèo' },
        { id: 14, image: pet_image, name: 'bơ', gender: 'đực', species: 'mèo' },
        { id: 15, image: pet_image, name: 'bé', gender: 'cái', species: 'mèo' },
        { id: 16, image: pet_image, name: 'cam', gender: 'cái', species: 'mèo' },
        { id: 17, image: pet_image, name: 'bé', gender: 'cái', species: 'chó' },
        { id: 18, image: pet_image, name: 'bông', gender: 'đực', species: 'mèo' },
        { id: 19, image: pet_image, name: 'cam', gender: 'cái', species: 'mèo' },
        { id: 20, image: pet_image, name: 'bơ', gender: 'cái', species: 'chó' },
        { id: 21, image: pet_image, name: 'heo', gender: 'đực', species: 'mèo' },
        { id: 22, image: pet_image, name: 'bé', gender: 'đực', species: 'chó' },
        { id: 23, image: pet_image, name: 'chồn', gender: 'cái', species: 'chó' },
        { id: 24, image: pet_image, name: 'mun', gender: 'cái', species: 'mèo' },
        { id: 25, image: pet_image, name: 'heo', gender: 'đực', species: 'chó' },
        { id: 26, image: pet_image, name: 'mập', gender: 'đực', species: 'mèo' },
        { id: 27, image: pet_image, name: 'cún', gender: 'cái', species: 'chó' }
    ]

    const [genderValue, setGenderValue] = useState(null);
    const [speciesValue, setSpeciesValue] = useState(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // const [pets, setPets] = useState([])

    const onSearch = (value) => {
        setSearchTerm(value.trim().toLowerCase());
        setGenderValue(null);  // Reset gender select
        setSpeciesValue(null); // Reset species select
        setCurrentPage(1);     // Reset to the first page
    };

    const pageSize = 21;

    const filteredPets = listUnadoptedPets.filter(pet => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (!genderValue || pet.gender.toLowerCase() === genderValue) &&
            (!speciesValue || pet.species === speciesValue) &&
            (
                !searchTerm ||
                pet.name.toLowerCase().includes(searchTermLower) ||
                pet.gender.toLowerCase().includes(searchTermLower) ||
                pet.species.toLowerCase().includes(searchTermLower)
            )
        );
    });

    const paginatedPets = filteredPets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handleChangePage = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 750);
    }
    return (
        <div className='pet-container'>
            <div className="pet-slide">
                <img src={image_3} />
                <div className="background-3"></div>
                <p className='content-3'>"Tình yêu thú cưng không đơn thuần là sự đồng hành, mà là <br />
                    hứa hẹn với trái tim và trách nhiệm với linh hồn."
                </p>
            </div>
            <div className="pet-unadopted">

                <div className="pet-filter">
                    <Search
                        placeholder="Search Pet"
                        allowClear
                        // enterButton="Search"
                        enterButton
                        size="large"
                        style={{
                            width: '40%',
                        }}
                        onSearch={onSearch}
                    />

                    <Select
                        showSearch
                        placeholder="All Species"
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
                            width: '15%',
                            // margin: '20px 20px 0'
                            marginLeft: '9%',
                        }}
                        options={[
                            { value: 'chó', label: 'Chó' },
                            { value: 'mèo', label: 'Mèo' },
                        ]}
                    />

                    <Select
                        showSearch
                        placeholder="All Genders"
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
                            width: '15%',
                            // margin: '20px 20px 0'
                            marginLeft: '20px',
                        }}
                        options={[
                            { value: 'cái', label: 'Cái' },
                            { value: 'đực', label: 'Đực' },
                        ]}
                    />
                </div>

                <div 
                    className="pet-unadopted-list"
                    data-items={paginatedPets.length < 3 ? paginatedPets.length : 3}
                >
                    <p className='title'>Danh sách thú cưng</p>
                    {paginatedPets.length === 0 ? (
                        <div className="not-found">
                            <img src={not_found} />
                            <p className="no-pet">The pet you are looking for is currently not available.</p>
                        </div>
                    ) : (
                        paginatedPets.map((item) => (
                            <div className="pet-unadopted-item" key={item.id}>
                                <img src={item.image} />
                                <div className="overlay">
                                    <button className="view-more-button">Xem thêm</button>
                                </div>
                                <div className="pet-unadopted-item-info">
                                    <p>Tên: {item.name}</p>
                                    <p>Giới tính: {item.gender}</p>
                                    <p>Loài: {item.species}</p>
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
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                        <img src={pet_image} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pet