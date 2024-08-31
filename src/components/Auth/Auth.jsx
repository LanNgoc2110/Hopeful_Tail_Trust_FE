import React, { useContext, useState } from 'react';
import { Button, Divider } from 'antd';
import './Auth.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Input } from 'antd';

export default function Auth({ comp }) {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      // email: Yup.string().matches(`^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$`, 'Email không chính xác').required('Required'),
      email: Yup.string().email('Email không chính xác').required('* Bắt buộc'),
      password: Yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required('* Bắt buộc'),
      confirmPassword: Yup.string().required('* Bắt buộc')
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='auth-whole-container'>
      <div className="auth-container">
        <div className="image_login">
          <img src="/assets/background_login.png"/>
        </div>
        <div className="form_auth">
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <Input
              size="large"
              placeholder="Email"
              prefix={<UserOutlined />}
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="message-error">{formik.errors.email}</p>
            )}

            {/* Password */}
            <Input.Password
              size='large'
              placeholder="Mật khẩu"
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="message-error">{formik.errors.password}</p>
            )}

            {/* Confirm password */}
            {comp === "Register" && (
              <>
                <Input.Password
                  size='large'
                  placeholder="Xác nhận mật khẩu"
                  visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                {formik.errors.confirmPassword && formik.touched.confirmPassword && (
                  <p className="message-error">{formik.errors.confirmPassword}</p>
                )}
              </>)
            }
            {comp === "Login" ?
              <Button htmlType='submit' className='btn-auth'>Đăng nhập</Button> :
              <Button htmlType='submit' className='btn-auth'>Đăng ký</Button>}
          </form>

          {comp === "Login" ?
              <a href="">Tạo tài khoản</a>:
            <a href="">Đã có tài khoản</a>}
          <Divider>Hoặc với</Divider>
          <Button icon={<GoogleOutlined />} className='btn-gglogin-auth'>Đăng nhập bằng Google</Button>
        </div>
      </div>
    </div>
  )
}
