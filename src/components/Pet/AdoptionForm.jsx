import React, { useEffect } from 'react'
import './AdoptionForm.css'
import pet_image from '/assets/pitbull.png';
import { useFormik } from 'formik'
import * as Yup from "yup";

const AdoptionForm = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            phone: "",
            cccd: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                // .matches(
                //     /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,
                //     "* Mỗi từ phải viết hoa chữ cái đầu"
                // )
                .required("* Không được để trống"),
            address: Yup.string().required("* Không được để trống"),
            phone: Yup.string()
                // .matches(`[^a-zA-Z]+`, "* Chỉ được nhập số")
                .matches(/^\S+$/, "* Không được chứa khoảng trắng")
                .matches(/^\d+$/, "* Chỉ được nhập số")
                .matches(`^[0][1-9]*`, "* Số điện thoại phải bắt đầu bằng số 0")
                .max(10, "* Số điện thoại phải có 10 chữ số")
                .min(10, "* Số điện thoại phải có 10 chữ số")
                .required("* Không được để trống"),
            cccd: Yup.string()
                .matches(/^\S+$/, "* Không được chứa khoảng trắng")
                .matches(/^\d+$/, "* Chỉ được nhập số")
                .required("* Không được để trống"),
        }),

        onSubmit: async (values) => {
            alert("Gửi câu hỏi thành công")
        }
    })

    return (
        <div className='adoption_form-container'>
            <form className='adoption_form' onSubmit={formik.handleSubmit}>
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
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <p className="message-error">{formik.errors.name}</p>
                    )}

                    <p><span>* </span>Địa chỉ: </p>
                    <input
                        name="address"
                        value={formik.values.address}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.address && formik.errors.address && (
                        <p className="message-error">{formik.errors.address}</p>
                    )}

                    <p><span>* </span>Số điện thoại: </p>
                    <input
                        name="phone"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.phone && formik.errors.phone && (
                        <p className="message-error">{formik.errors.phone}</p>
                    )}

                    <p><span>* </span>Số CMND/CCCD: </p>
                    <input
                        name="cccd"
                        value={formik.values.cccd}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.cccd && formik.errors.cccd && (
                        <p className="message-error">{formik.errors.cccd}</p>
                    )}

                </div>
                <p className='adoption_form-notice'>
                    ⚠️ Lưu ý: Khi quyết định nhận nuôi thú cưng, bạn cần cam kết mang lại một môi trường sống an toàn, yêu thương và chăm sóc tốt nhất cho chúng. Việc bỏ rơi hoặc thiếu trách nhiệm có thể gây ảnh hưởng nghiêm trọng đến sức khỏe và tinh thần của thú cưng. Xin hãy cân nhắc kỹ trước khi gửi yêu cầu nhận nuôi.
                </p>
                <div className="adoption_form-btn">
                    <button type='submit'>Gửi yêu cầu nhận nuôi</button>
                </div>
            </form>
        </div>
    )
}

export default AdoptionForm