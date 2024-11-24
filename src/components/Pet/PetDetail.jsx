import React from 'react'
import './PetDetail.css'

import { Link, useLocation, useNavigate } from 'react-router-dom';

import pet_image from '/assets/pitbull.png';
import { Breadcrumb } from 'antd';
import { BaiduOutlined } from '@ant-design/icons';

const PetDetail = () => {
    const location = useLocation();  // Lấy dữ liệu thú cưng từ state
    const navigate = useNavigate();

    // Kiểm tra nếu không có dữ liệu thú cưng, chuyển hướng lại trang chính
    if (!location.state || !location.state.pet) {
        navigate('/');
        return null;
    }

    const pet = location.state.pet;  // Dữ liệu thú cưng được truyền từ Pet.jsx

    const translations = {
        coatColor: {
            Black: 'Đen',
            Brown: 'Nâu',
            White: 'Trắng',
            Yellow: 'Vàng',
            Orange: 'Cam',
            Gray: 'Xám',
        },
    };

    return (
        <div className='pet_detail-container'>
            <div className="back-to-adoption">
                <Breadcrumb className='breadcrumb'
                    items={[
                        {
                            title: <Link
                                to="/adoption"
                                className='b-title-1'
                                state={{
                                    searchTerm: location.state?.searchTerm,
                                    scrollY: location.state?.scrollY,
                                    currentPage: location.state?.currentPage
                                }}
                            >
                                <BaiduOutlined /> Nhận nuôi
                            </Link>,
                        },
                        {
                            title: <p to="" className='b-title-2'>{pet.name}</p>,
                        },
                    ]}
                />
            </div>
            <p className='title'>Thú cưng</p>
            <div className="pet_detail-left">
                <img src={pet.image.url} />
            </div>
            <div className="pet_detail-right">
                <div className="pet_detail-content">
                    <p>Tên: {pet.name}</p>
                    <p>Loài: {pet.species === 'Cat' ? 'Mèo' : 'Chó'}</p>
                    <p>Giống: {pet.breed}</p>
                    <p>Màu lông: {translations.coatColor[pet.coatColor] || pet.coatColor}</p>
                    <p>Giới tính: {pet.sex === 'Female' ? 'Cái' : 'Đực'}</p>
                    <p>Tuổi: {pet.age}</p>
                    <p>Tiêm ngừa:  {pet.vaccinated ? 'Đã tiêm ngừa' : 'Chưa tiêm ngừa'}</p>
                    <p>Tình trạng sức khỏe: {pet.healthStatus === "Healthy" ? "Khỏe mạnh" : "Đang điều trị"}</p>
                    <p>Mô tả: {pet.description}</p>
                    <p>Địa chỉ trạm cứu hộ: {pet.location}</p>
                    <button
                        className='adoption-request-btn'
                        onClick={() => navigate(`/adoption/${pet._id}/adoption-form`)}
                    >
                        Gửi yêu cầu nhận nuôi
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PetDetail