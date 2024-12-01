import React, { useEffect, useState } from 'react'
import './AdoptionForm.css'
import pet_image from '/assets/pitbull.png';
import { useFormik } from 'formik'
import * as Yup from "yup";
import { LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getPetById } from '../../redux/actions/pets.action';
import { message, Skeleton } from 'antd';
import { getUserFromToken } from '../../utils/Token';
import { adoptionApi } from '../../apis/adoption.request';

const AdoptionForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams().id;
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const { user } = getUserFromToken()


    useEffect(() => {
        dispatch(getPetById(id))
        window.scrollTo(0, 0);
    }, []);

    const { payload: pet, isLoading, error } = useSelector(state => state.petsReducer);

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
                //   /^[^0-9!@#$%^&*(),.?":{}|<>]*$/,
                //   "* Không được nhập số và ký tự đặc biệt"
                // )
                .matches(
                    /^[^0-9]*$/,
                    "* Họ tên không được nhập số"
                )
                .matches(
                    /^[^!@#$%^&*(),.?":{}|<>]*$/,
                    "* Họ tên không được chứa ký tự đặc biệt"
                )
                .matches(
                    /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,
                    "* Mỗi từ phải viết hoa chữ cái đầu"
                )
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
                .max(12, "* CCCD/CMND phải có 12 chữ số")
                .min(12, "* CCCD/CMND phải có 12 chữ số")
                .required("* Không được để trống"),
        }),

        onSubmit: async (values) => {
            setIsLoadingForm(true);
            try {
                if (user) {
                    const data = {
                        petId: id,
                        name: values.name,
                        address: values.address,
                        phoneNumber: values.phone,
                        cccd: values.cccd,
                    }
                    await adoptionApi.createAdoption(data);

                    setIsLoadingForm(false);
                    message.success("Đơn xin nhận nuôi thú cưng thành công.");
                    navigate("/user/adoption-form-history");
                } else {
                    message.warning("Vui lòng đăng nhập trước khi truy cập.");
                    setIsLoadingForm(false);
                }
            } catch (error) {
                setIsLoadingForm(false);
                message.error(error.response.data.message);
                // console.log(error);

            }
        }
    })

    return (
        <div className='adoption_form-container'>
            <form className='adoption_form' onSubmit={formik.handleSubmit}>
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
                ) : (
                    <></>
                )}
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
                    <button disabled={isLoadingForm} type='submit'>{isLoadingForm && <LoadingOutlined style={{ marginRight: 10 }} />}Gửi yêu cầu nhận nuôi</button>
                </div>
            </form>
        </div>
    )
}

export default AdoptionForm