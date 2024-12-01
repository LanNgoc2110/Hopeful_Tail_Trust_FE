import React, { useEffect } from 'react'
import './PetDetail.css'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import pet_image from '/assets/pitbull.png';
import { Breadcrumb, message, Spin } from 'antd';
import {
    BaiduOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPetById } from '../../redux/actions/pets.action';
import not_found from "/assets/not-found.png"
import { getUserFromToken } from '../../utils/Token';
import optionHealthStatus from '../../data/optionHealthStatus.json';

const PetDetail = () => {
    const location = useLocation();  // Lấy dữ liệu thú cưng từ state
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = useParams().id;
    const { message: errorMessage, user } = getUserFromToken()

    useEffect(() => {
        dispatch(getPetById(id));
    }, []);

    const checkUser = () => {
        if (user) {
            return navigate(`/adoption/${pet._id}/adoption-form`)
        }
        message.warning(errorMessage)
    }

    const { payload: pet, isLoading, error } = useSelector((state) => state.petsReducer);

    // if (error) {
    //     navigate('/');
    //     return null;
    // }

    // const pet = location.state.pet;  // Dữ liệu thú cưng được truyền từ Pet.jsx


    // Kiểm tra nếu không có dữ liệu thú cưng, chuyển hướng lại trang chính
    // if (!location.state || !location.state.pet) {
    //     navigate('/');
    //     return null;
    // }

    // const pet = location.state.pet;  // Dữ liệu thú cưng được truyền từ Pet.jsx

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

    const renderHealthStatus = (status) => {
        const matchedOption = optionHealthStatus.find(option => option.value === status);
        return matchedOption ? (
            matchedOption.label
        ) : (
            status
        );
    }

    return (
        <div className='pet_detail-container'>
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
            {pet ? (
                <>
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
                    <div className="pet_detail-height">
                        <div className="pet_detail-left">
                            <img src={pet.image.url} />
                            {/* <img src={pet_image} /> */}
                        </div>
                        <div className="pet_detail-right">
                            <div className="pet_detail-content">
                                <p>{pet.name}</p>
                                <p>Loài: {pet.species === 'Cat' ? 'Mèo' : 'Chó'}</p>
                                <p>Giống: {pet.breed}</p>
                                <p>Màu lông: {translations.coatColor[pet.coatColor] || pet.coatColor}</p>
                                <p>Giới tính: {pet.sex === 'Female' ? 'Cái' : 'Đực'}</p>
                                <p>Tuổi: {pet.age}</p>
                                <p>Tiêm ngừa: {pet.vaccinated} /4</p>
                                <p>Tình trạng sức khỏe: {renderHealthStatus(pet.healthStatus)}</p>
                                <p>Mô tả: {pet.description} </p>
                                <p>Địa chỉ trạm cứu hộ: {pet.location}</p>
                                <button
                                    className='adoption-request-btn'
                                    onClick={() => checkUser()}
                                >
                                    Gửi yêu cầu nhận nuôi
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : !isLoading && (<>
                <div className="not-found">
                    <img src={not_found} />
                </div>
            </>)}
        </div>
    )
}

export default PetDetail