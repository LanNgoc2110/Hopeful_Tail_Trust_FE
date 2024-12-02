import { Breadcrumb, message, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import {
    BaiduOutlined
} from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adoptionApi } from '../../../apis/adoption.request';
import { petApi } from '../../../apis/pet.request';
import './AdoptionFormDetail.css'
import optionHealthStatus from '../../../data/optionHealthStatus.json';

export default function AdoptionFormDetail() {
    const [isLoading, setIsLoading] = useState(true);
    const [pet, setPet] = useState(null);
    const [adoption, setAdoption] = useState(null);
    const [loadingForm, setLoadingForm] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const fetchAdopt = async () => {
            try {
                const resAdopt = await adoptionApi.getAdoptionById(id);
                if (resAdopt.data.data.pet) {
                    const resPet = await petApi.getPetById(resAdopt.data.data.pet);
                    setPet(resPet.data.data);
                }
                setIsLoading(false);
                setAdoption(resAdopt.data.data);
            } catch (error) {
                console.log(error);
                // message.error(error.response.data.message);
            }
        }
        fetchAdopt();
    }, [id])

    const handleApprove = async (status, e) => {
        e.preventDefault();
        setLoadingForm(true);
        messageApi.open({
            type: 'loading',
            content: 'Xin đợi trong giây lát',
        })
        try {
            const res = await adoptionApi.updateAdoption({ id, status });
            if (status === "approved") {
                messageApi.destroy()
                message.success("Đã duyệt đơn thành công");
            } else if (status === "rejected") {
                messageApi.destroy()
                message.error("Đã từ chối đơn xin nhận nuôi");
            }
            setLoadingForm(false);
            navigate("/admin/adopted-management");
        } catch (error) {
            messageApi.destroy()
            setLoadingForm(false);
            console.log(error);
            message.error(error.response.data.message);
        }
    }

    const renderHealthStatus = (status) => {
        const matchedOption = optionHealthStatus.find(option => option.value === status);
        return matchedOption ? (
            matchedOption.label
        ) : (
            status
        );
    }

    return (
        <div className='adoption_form_detail-container'>
            <div className="back-to-adoption_form_history">
                <Breadcrumb
                    items={[
                        { title: <Link to="/admin/adopted-management"><BaiduOutlined /> Đơn xin nhận nuôi</Link> },
                        { title: "Đơn xin nhận nuôi" }
                    ]}
                />
            </div>
            <form className='adoption_form_detail-form'>
                <h1>Đơn xin nhận nuôi thú cưng</h1>
                {isLoading &&
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
                {!isLoading && pet ? (
                    <div className="pet-info">
                        <div className="pet-info-left">
                            <img src={pet.image.url} />
                        </div>
                        <div className="pet-info-right">
                            <p>Tên thú cưng: {pet.name}</p>
                            <p>Loài: {pet.species === 'Cat' ? 'Mèo' : 'Chó'} </p>
                            <p>Giống: {pet.breed}</p>
                            <p>Giới tính: {pet.sex === 'Female' ? 'Cái' : 'Đực'}</p>
                            <p>Tuổi: {pet.age}</p>
                            <p>Màu lông: {pet.coatColor}</p>
                            <p>Tiêm ngừa: {pet.vaccinated}/4</p>
                            <p>Tình trạng sức khỏe: {renderHealthStatus(pet.healthStatus)}</p>
                            <p>Địa chỉ trạm cứu hộ: {pet.location}</p>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
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
                {adoption?.status === "pending" ? (
                    <div className="adoption_form-btn">
                        <button disabled={loadingForm} onClick={(e) => handleApprove("approved", e)}>Phê duyệt</button>
                        <button disabled={loadingForm} onClick={(e) => handleApprove("rejected", e)}>Từ chối</button>
                    </div >
                ) : (
                    <div className="adoption_form-btn">
                        <button disabled style={{ backgroundColor: adoption?.status === "approved" ? "green" : "red", cursor: 'not-allowed' }}> Đơn đã {adoption?.status === "approved" ? "phê duyệt" : "từ chối"}</button>
                    </div>
                )}
            </form>
        </div>
    )
}
