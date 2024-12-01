import React, { useEffect, useState } from 'react'
import './AdoptionFormInfo.css'
import { Breadcrumb, Skeleton } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Link, useLocation, useParams } from 'react-router-dom';
import pet_image from '/assets/pitbull.png';
import { petApi } from '../../../apis/pet.request';
import { adoptionApi } from '../../../apis/adoption.request';
import optionStatusAdopt from '../../../data/optionStatusAdopt.json';

const AdoptionFormInfo = () => {
    const location = useLocation();  // Lấy dữ liệu currentPage từ state
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const [adoption, setAdoption] = useState({});
    const [loadingFetchData, setLoadingFetchData] = useState(false);

    useEffect(() => {
        setLoadingFetchData(true);
        const fetchAdopt = async () => {
            try {
                const resAdopt = await adoptionApi.getAdoptionById(id);
                if (resAdopt.data.data.pet) {
                    const resPet = await petApi.getPetById(resAdopt.data.data.pet);
                    setPet(resPet.data.data);
                    // console.log(resPet.data.data);
                }
                setLoadingFetchData(false);
                // console.log(resAdopt.data.data);
                setAdoption(resAdopt.data.data);
            } catch (error) {
                setLoadingFetchData(false);
                console.log(error);
                // message.error(error.response.data.message);
            }
        }
        fetchAdopt();
    }, [id])

    return (
        <div className='adoption_form_info-container'>
            <div className="back-to-adoption_form_history">
                <Breadcrumb className='breadcrumb'
                    items={[
                        {
                            title: <Link
                                to="/user/adoption-form-history"
                                className='b-title-1'
                                state={{
                                    currentPage: location.state?.currentPage
                                }}
                            >
                                <ProfileOutlined /> Lịch sử đơn xin nhận nuôi
                            </Link>,
                        },
                        {
                            title: <p to="" className='b-title-2'>{pet?.name}</p>,
                        },
                    ]}
                />
            </div>
            <form className='adoption_form_info-form'>
                <h1>Đơn xin nhận nuôi thú cưng</h1>
                {loadingFetchData &&
                    <div className="pet-info">
                        <div className="pet-info-left">
                            <Skeleton.Image style={{ width: 300, height: 300 }} active />
                        </div>
                        <div className="pet-info-right">
                            <Skeleton active />
                            <Skeleton active />
                        </div>
                    </div>
                }
                {!loadingFetchData && pet ? (
                    <div className="pet-info">
                        <div className="pet-info-left">
                            <img src={pet.image?.url} />
                        </div>
                        <div className="pet-info-right">
                            <p>Tên thú cưng: {pet.name}</p>
                            <p>Loài: {pet.species} </p>
                            <p>Giống: {pet.breed}</p>
                            <p>Giới tính: {pet.sex}</p>
                            <p>Tuổi: {pet.age}</p>
                            <p>Màu lông: {pet.coatColor}</p>
                            <p>Tiêm ngừa: {pet.vaccinated}</p>
                            <p>Tình trạng sức khỏe: {pet.healthStatus}</p>
                            <p>Địa chỉ trạm cứu hộ: {pet.location}</p>
                        </div>
                    </div>
                ) : (<></>)}
                <div className="adopter-info">

                    <p><span>* </span>Họ tên người nhận nuôi: </p>
                    <input
                        name="name"
                        readOnly
                        defaultValue={adoption?.name}
                    />

                    <p><span>* </span>Địa chỉ: </p>
                    <input
                        name="address"
                        readOnly
                        defaultValue={adoption?.address}
                    />
                    <p><span>* </span>Số điện thoại: </p>
                    <input
                        name="phone"
                        readOnly
                        defaultValue={adoption?.phoneNumber}
                    />

                    <p><span>* </span>Số CMND/CCCD: </p>
                    <input
                        name="cccd"
                        readOnly
                        defaultValue={adoption?.cccd}
                    />

                </div>
                <p className='adoption_form-notice'>
                    ⚠️ Lưu ý: Khi quyết định nhận nuôi thú cưng, bạn cần cam kết mang lại một môi trường sống an toàn, yêu thương và chăm sóc tốt nhất cho chúng. Việc bỏ rơi hoặc thiếu trách nhiệm có thể gây ảnh hưởng nghiêm trọng đến sức khỏe và tinh thần của thú cưng. Xin hãy cân nhắc kỹ trước khi gửi yêu cầu nhận nuôi.
                </p>
                <div className="adoption_form-btn">
                    <button type='submit'>{optionStatusAdopt.find((item) => item.value === adoption.status)?.label || 'Không rõ trạng thái'}</button>
                </div>
            </form>
        </div>
    )
}

export default AdoptionFormInfo