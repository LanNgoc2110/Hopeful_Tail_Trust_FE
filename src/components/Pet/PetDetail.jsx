import React from 'react'
import './PetDetail.css'

import { Link, useLocation, useNavigate } from 'react-router-dom';

import pet_image from '/assets/pitbull.png';
import { Breadcrumb } from 'antd';
import {BaiduOutlined} from '@ant-design/icons';

const PetDetail = () => {
    const location = useLocation();  // Lấy dữ liệu thú cưng từ state
    const navigate = useNavigate();

    // Kiểm tra nếu không có dữ liệu thú cưng, chuyển hướng lại trang chính
    if (!location.state || !location.state.pet) {
        navigate('/');
        return null;
    }

    const pet = location.state.pet;  // Dữ liệu thú cưng được truyền từ Pet.jsx
    

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
                            title:<p to="" className='b-title-2'>{pet.name}</p>,
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
                    <p>Giới tính: {pet.sex === 'Female' ? 'Cái' : 'Đực'}</p>
                    <p>Loài: {pet.species}</p>
                    <p>Tuổi: {pet.age}</p>
                    <p>Tiêm ngừa: {pet.vaccinated}</p>
                    <p>Tình trạng sức khỏe: {pet.healthStatus}</p>
                    <button className='adoption-request-btn'>Gửi yêu cầu nhận nuôi </button>
                </div>
            </div>
        </div>
    )
}

export default PetDetail