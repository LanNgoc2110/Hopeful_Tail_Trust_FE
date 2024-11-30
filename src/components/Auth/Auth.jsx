import React, { useContext, useState } from 'react';
import { Button, Divider, message } from 'antd';
import './Auth.css'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { UserOutlined, HomeFilled, MailOutlined, HomeOutlined, PhoneOutlined, LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import google_img from '/assets/google.png'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth.action';
import { authApi } from '../../apis/auth.request';
import store from "../../store/ReduxStore";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function Auth({ comp }) {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [passwordVisible, setPasswordVisible] = useState(false)
  // const authState = useSelector(state => state.authReducer);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      fullname: '',
      address: '',
      phoneNumber: ''
    },
    validationSchema: Yup.object({
      username: comp === "Register"
        ? Yup.string().max(30, "* Tên người dùng không được vượt quá 30 ký tự").required("* Bắt buộc") : Yup.string(),
      // email: Yup.string().matches(`^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$`, 'Email không chính xác').required('Required'),
      email: comp === "Register"
        ? Yup.string().matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "* Email không hợp lệ"
        ).required('* Bắt buộc') : Yup.string(),
      password: Yup.string().min(6, "* Mật khẩu phải có ít nhất 6 ký tự trở lên").required("* Bắt buộc"),
      fullname: comp === "Register"
        ? Yup.string().max(30, "* Tên người dùng không được vềt quá 30 ký tự").required("* Bắt buộc") : Yup.string(),
      address: comp === "Register"
        ? Yup.string().required("* Bắt buộc") : Yup.string(),
      phoneNumber:
        comp === "Register"
          ? Yup.string()
            // .matches(`[^a-zA-Z]+`, "Chỉ được nhập số")
            .matches(/^\S+$/, "* Số điện thoại không được chứa khoảng trắng")
            .matches(/^\d+$/, "* Chỉ được nhập số")
            .matches(`^[0][1-9]*`, "* Số điện thoại phải bắt đầu bằng số 0")
            .max(10, "* Số điện thoại phải có 10 chữ số")
            .min(10, "* Số điện thoại phải có 10 chữ số")
            .required("* Bắt buộc")
          : Yup.string()
    }),
    onSubmit: async (values) => {
      messageApi.open({
        type: 'loading',
        content: 'Xin đợi trong giây lát',
      })
      try {
        if (comp === "Login") {
          const user = { identifier: values.email, password: values.password };
          // console.log(user);

          await dispatch(login(user));
          const authState = store.getState().authReducer;

          if (authState.payload) {
            messageApi.destroy()
            message.success("Đăng nhập thành công");
            navigate("/");
          } else {
            messageApi.destroy()
            messageApi.error(authState.error.message);
          }
        } else if (comp === "Register") {
          const response = await authApi.register(values);

          if (response.data.error_code === 0) {
            messageApi.destroy()
            message.success("Đăng ký thành công, vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập");
            navigate("/login");
          }
        }
      } catch (error) {
        messageApi.destroy()
        messageApi.error(error.response.data.message);
      }
    },
  });

  const navigate = useNavigate()

  const handleLoginSuccess = async (response) => {
    try {
      const res = await axios.post('https://backend-exe-2.vercel.app/api/auth/google/callback', {
        token: response.credential,
      });

      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div className='auth-whole-container'>
      {contextHolder}
      <div className="auth-container">
        <div className="auth-left">
          <button onClick={() => navigate("/")}><HomeFilled /></button>
          <p>Chào mừng đến với Hopeful Tails Trust!</p>
          {comp === "Login"
            ? <img src="/assets/background_login.png" className='logo_login-img' />
            : <img src="/assets/inu.png" className='register_login-img' />}

        </div>
        <div className="auth-right">

          <div className="register-or-login">
            <button onClick={() => navigate("/login")}>Đăng nhập</button>
            <button onClick={() => navigate("/register")}>Đăng ký</button>
          </div>

          {comp === "Login"
            ? <p className='title login'>Đăng nhập</p>
            : <p className='title register'>Đăng ký</p>}

          <form onSubmit={formik.handleSubmit} className={comp === "Login" ? 'login-form' : 'register-form'}>
            {/* Email */}

            {comp === "Register" && (
              <>
                <Input
                  className='input'
                  size="large"
                  placeholder="Username"
                  prefix={<UserOutlined />}
                  id="username"
                  name="username"
                  type=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.errors.email && formik.touched.username && (
                  <p className="message-error">{formik.errors.username}</p>
                )}
              </>
            )}

            <Input
              className='input'
              size="large"
              placeholder={comp === "Login" ? "Nhập username hoặc email" : "Email"}
              prefix={comp === "Login" ? <UserOutlined /> : <MailOutlined />}
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="message-error">{formik.errors.email}</p>
            )}

            {/* Password */}
            <Input.Password
              prefix={<LockOutlined />}
              className='input'
              size='large'
              placeholder="Mật khẩu"
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="message-error">{formik.errors.password}</p>
            )}

            {/* Confirm Password (only for registration) */}
            {comp === "Register" && (
              <>
              <Input
                  className='input fullname'
                  size="large"
                  placeholder="Họ tên"
                  prefix={<UserOutlined />}
                  id="fullname"
                  name="fullname"
                  type=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullname}
                />
                {formik.errors.email && formik.touched.fullname && (
                  <p className="message-error">{formik.errors.fullname}</p>
                )}
                <Input
                  className='input'
                  size="large"
                  placeholder="Địa chỉ"
                  prefix={<HomeOutlined />}
                  id="address"
                  name="address"
                  type=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address}
                />
                {formik.errors.email && formik.touched.address && (
                  <p className="message-error">{formik.errors.address}</p>
                )}
                <Input
                  className='input'
                  size="large"
                  placeholder="Số điện thoại"
                  prefix={<PhoneOutlined />}
                  id="phoneNumber"
                  name="phoneNumber"
                  type=""
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                {formik.errors.email && formik.touched.phoneNumber && (
                  <p className="message-error">{formik.errors.phoneNumber}</p>
                )}
              </>
            )}


            <div className="login_or_register-btn">
              <button
                // disabled={store.getState().authReducer.isLoading}
                type="submit"
              >
                {comp === "Login" ? 'Đăng nhập' : 'Đăng ký'}</button>
            </div>
          </form>



          {/* Confirm password */}
          {/* {comp === "Register" && (
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
              <Button htmlType='submit' className='btn-auth'>Đăng ký</Button>} */}

          {/* {comp === "Login" ?
            <a href="">Tạo tài khoản</a> :
            <a href="">Đã có tài khoản</a>} */}

          <div className="divider">
            <Divider className='divider-text'>Hoặc với</Divider>
          </div>

          {/* <div className="login_google-btn">
            <button onClick={() => handleLoginSuccess()}>
              <img src={google_img} /> <p>  &ensp; Đăng nhập bằng Google</p>
            </button>
          </div> */}
          {/* <div className="login_google-btn">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
              client_id="745062279110-15fh8s0cu6d6t248pvkll42sa7src4u3.apps.googleusercontent.com"
            />
          </div> */}
        </div>
      </div>
    </div >
  )
}
