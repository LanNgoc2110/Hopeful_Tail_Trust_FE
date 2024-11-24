import React from 'react'
import './Payment.css'
import { useFormik } from 'formik'
import * as Yup from "yup";

const Payment = () => {
  const formik = useFormik({
    initialValues: {
      // lastName: "",
      // firstName: "",
      fullName: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      phone: ""
    },
    validationSchema: Yup.object({
      // lastName: Yup.string().required("* Không được để trống"),
      // firstName: Yup.string().required("* Không được để trống"),
      fullName: Yup.string().required("* Không được để trống"),
      street: Yup.string().required("* Không được để trống"),
      ward: Yup.string().required("* Không được để trống"),
      district: Yup.string().required("* Không được để trống"),
      city: Yup.string().required("* Không được để trống"),
      phone: Yup.string()
        // .matches(`[^a-zA-Z]+`, "* Chỉ được nhập số")
        .matches(/^\S+$/, "* Số điện thoại không được chứa khoảng trắng")
        .matches(/^\d+$/, "* Chỉ được nhập số")
        .matches(`^[0][1-9]*`, "* Số điện thoại phải bắt đầu bằng số 0")
        .max(10, "* Số điện thoại phải có 10 chữ số")
        .min(10, "* Số điện thoại phải có 10 chữ số")
        .required("* Không được để trống")
    }),

    onSubmit: async (values) => {
      alert("Gửi câu hỏi thành công")
    }
  })
  return (
    <div>
      <form className='payment-container' onSubmit={formik.handleSubmit}>
        <div className="payment-left">
          <p className='title'>Thanh toán</p>
          <p className='sub-title'>Địa chỉ giao hàng</p>

          {/* <div className="two-input-field">
            <div className="input-left">
              <input
                placeholder='Họ'
                name="lastName"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className='message-error'>{formik.errors.lastName}</p>
              )}
            </div>
            <div className="input-right">
              <input
                placeholder='Tên'
                name="firstName"
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className='message-error'>{formik.errors.firstName}</p>
              )}
            </div>
          </div> */}

          <input
            placeholder='Họ Tên'
            name="fullName"
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className='message-error'>{formik.errors.fullName}</p>
          )}

          <input
            placeholder='Số nhà, Đường'
            name="street"
            value={formik.values.street}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.street && formik.touched.street && (
            <p className='message-error'>{formik.errors.street}</p>
          )}

          <input
            placeholder='Phường/Xã'
            name="ward"
            value={formik.values.ward}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.ward && formik.touched.ward && (
            <p className='message-error'>{formik.errors.ward}</p>
          )}

          <input
            placeholder='Quận/Huyện'
            name="district"
            value={formik.values.district}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.district && formik.touched.district && (
            <p className='message-error'>{formik.errors.district}</p>
          )}

          <input
            placeholder='Tỉnh/Thành phố'
            name="city"
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.city && formik.touched.city && (
            <p className='message-error'>{formik.errors.city}</p>
          )}

          <input
            placeholder='Số diện thoại'
            name="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className='message-error'>{formik.errors.phone}</p>
          )}
        </div>


        <div className="payment-right">
          <p className='title'>Tổng đơn hàng</p>

          <div className="payment-info">
            <div className="payment-info-left">
              <p>Mã đơn hàng</p>
              <p>Sản phẩm</p>
              <p>Phí giao hàng</p>
              <p>Tổng giá</p>
            </div>
            <div className="payment-info-right">
              <p>sadhiuh</p>
              <p>3.000.000 VND</p>
              <p>20.000 VND</p>
              <p>3.020.000 VND</p>
            </div>
          </div>

          <div className="payment-btn">
            <button type='submit'>Thanh toán</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Payment