import React, { useState } from 'react'
import './VerifyEmail.css'
import check_img from '/assets/checked.png'
import { useNavigate, useSearchParams, } from 'react-router-dom'
import { authApi } from '../../apis/auth.request'
import { message } from 'antd'
import {
    LoadingOutlined
} from '@ant-design/icons';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleVerifyEmail = async () => {
        setLoading(true);
        const token = searchParams.get('token');
        try {
            if (token) {
                const res = await authApi.verifyEmail(token);
                setLoading(false);
                message.success('Xác nhận email thành công');
                navigate('/login');
            }
        } catch (error) {
            setLoading(false);
            message.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <div className='verify-email-whole-container'>
            <div className="verify-email-container">
                <h1 className="title">✨ Xác nhận email của bạn! ✨ </h1>

                <div className="verify-email-content">
                    <div className="verify-email-img">
                        <img src={check_img} />
                    </div>
                    <p className="title">Hãy kiểm tra hộp thư email của bạn</p>
                    {/* <p className="content">
                        Một email xác nhận sẽ được gửi tới địa chỉ email bạn đã đăng ký.
                        Vui lòng kiểm tra hộp thư (bao gồm cả mục spam/quảng cáo) và nhấp vào
                        liên kết trong email để hoàn tất quá trình xác thực tài khoản.
                        <br /> <br />
                        Nếu bạn không nhận được email trong vài phút, hãy kiểm tra lại địa chỉ
                        email hoặc thử gửi lại yêu cầu xác nhận.
                    </p> */}
                    <p>Sau khi xác thực thành công, tài khoản của bạn sẽ được kích hoạt.</p>
                    <div className="verify-email-btn">
                        <button disabled={loading} onClick={() => handleVerifyEmail()}> {loading && <LoadingOutlined style={{ marginRight: '10px' }} />} Xác thực mail</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail