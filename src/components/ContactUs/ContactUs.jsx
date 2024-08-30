import React from 'react'
import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className='contact_us-container'>
      <p className='title'>Liên hệ với chúng tôi</p>
      <p className='content'>Có câu hỏi hoặc cần hỗ trợ? Liên hệ với chúng tôi ngay</p>
      <form className='contact_us-form-input'>
        <label>Câu hỏi</label>
        <input placeholder='Điền vào chỗ trống' />

        <label>Email</label>
        <input placeholder='Điền vào chỗ trống' />

        <div className="contact_us-form-btn">
          <button
            className='reset-btn'
            type="reset"
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