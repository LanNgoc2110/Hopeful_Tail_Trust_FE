import React from 'react'
import './AdoptionFormInfo.css'
import { Breadcrumb } from 'antd';
import { ProfileOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import pet_image from '/assets/pitbull.png';

const AdoptionFormInfo = () => {
    const location = useLocation();  // Lấy dữ liệu currentPage từ state

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
                            title: <p to="" className='b-title-2'>Tên thú cưng</p>,
                        },
                    ]}
                />
            </div>
            <form className='adoption_form_info-form'>
                <h1>Đơn xin nhận nuôi thú cưng</h1>
                <div className="pet-info">
                    <div className="pet-info-left">
                        <img src={pet_image} />
                    </div>
                    <div className="pet-info-right">
                        <p>Tên thú cưng: Pitbull</p>
                        <p>Loài: Chó </p>
                        <p>Giống: Laborder</p>
                        <p>Giới tính: Đực</p>
                        <p>Tuổi: 5</p>
                        <p>Màu lông: Đen</p>
                        <p>Tiêm ngừa: Đã tiêm ngừa</p>
                        <p>Tình trạng sức khỏe: Khỏe mạnh</p>
                        <p>Địa chỉ trạm cứu hộ: 123 Nguyen Van Linh, Phường 3, Quan 5, TP. HCM</p>
                    </div>
                </div>
                <div className="adopter-info">

                    <p><span>* </span>Họ tên người nhận nuôi: </p>
                    <input
                        name="name"
                        readOnly
                        defaultValue="John Doe"
                    />

                    <p><span>* </span>Địa chỉ: </p>
                    <input
                        name="address"
                        readOnly
                    />
                    <p><span>* </span>Số điện thoại: </p>
                    <input
                        name="phone"
                        readOnly
                    />

                    <p><span>* </span>Số CMND/CCCD: </p>
                    <input
                        name="cccd"
                        readOnly
                    />

                </div>
                <p className='adoption_form-notice'>
                    ⚠️ Lưu ý: Khi quyết định nhận nuôi thú cưng, bạn cần cam kết mang lại một môi trường sống an toàn, yêu thương và chăm sóc tốt nhất cho chúng. Việc bỏ rơi hoặc thiếu trách nhiệm có thể gây ảnh hưởng nghiêm trọng đến sức khỏe và tinh thần của thú cưng. Xin hãy cân nhắc kỹ trước khi gửi yêu cầu nhận nuôi.
                </p>
                <div className="adoption_form-btn">
                    <button type='submit'>Chờ xét duyệt</button>
                </div>
            </form>
        </div>
    )
}

export default AdoptionFormInfo