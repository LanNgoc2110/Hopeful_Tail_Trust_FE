import React from 'react'
import './ContactUs.css'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { message } from 'antd';

const ContactUs = () => {

  const formik = useFormik({
    initialValues: {
      question: "",
      email: ""
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Không được để trống"),
      email: Yup.string().matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email không hợp lệ"
      ).required("Không được để trống")
    }),
    onSubmit: async (values) => {
      alert("Gửi câu hỏi thành công")
    }
  })

  return (
    <div className='contact_us-container'>
      <p className='title'>Liên hệ với chúng tôi</p>
      <p className='content'>Có câu hỏi hoặc cần hỗ trợ? Liên hệ với chúng tôi ngay</p>

      <form className='contact_us-form-input' onSubmit={formik.handleSubmit}>
        <label>Câu hỏi</label>
        <input 
          placeholder='Điền vào chỗ trống' 
          name="question"
          value={formik.values.question}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.errors.question && formik.touched.question && (
          <p className='message-error'>{formik.errors.question}</p>
        )}

        <label>Email</label>
        <input 
          placeholder='Điền vào chỗ trống' 
          name="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <p className='message-error'>{formik.errors.email}</p>
        )}

        <div className="contact_us-form-btn">
          <button
            className='reset-btn'
            type="button"
            onClick={() => formik.resetForm()}
          >
            Reset
          </button>
          <button
            className='submit-btn'
            type="submit"
          >
            Gửi tin nhắn
          </button>
        </div>
      </form>
    </div>
  )
}

export default ContactUs