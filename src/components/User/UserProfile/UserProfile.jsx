import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { getUserFromToken } from '../../../utils/Token';
import { userApi } from '../../../apis/user.request';
import { message } from 'antd';
import { useFormik } from 'formik'
import * as Yup from "yup";

const UserProfile = () => {
  const { user } = getUserFromToken();

  const [isEdited, setIsEdited] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    fullname: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userApi.getUserById(user.id);
        // console.log(response.data);

        setNewUser({
          username: response.data.data.username,
          email: response.data.data.email,
          fullname: response.data.data.fullname,
          address: response.data.data.address,
          phoneNumber: response.data.data.phoneNumber,
        });

        formik.setValues({
          fullname: response.data.data.fullname,
          address: response.data.data.address,
          phoneNumber: response.data.data.phoneNumber
        })
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  const formik = useFormik({
    initialValues: {
      fullname: '',
      address: '',
      phoneNumber: ''
    },
    validationSchema: Yup.object({
      fullname: Yup.string()
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
        ).matches(
          /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,
          "* Mỗi từ phải viết hoa chữ cái đầu"
        )
        .max(30, "* Tên người dùng không được vềt quá 30 ký tự")
        .required("* Bắt buộc"),
      address: Yup.string().required("* Bắt buộc"),
      phoneNumber: Yup.string()
        // .matches(`[^a-zA-Z]+`, "Chỉ được nhập số")
        .matches(/^\S+$/, "* Số điện thoại không được chứa khoảng trắng")
        .matches(/^\d+$/, "* Chỉ được nhập số")
        .matches(`^[0][1-9]*`, "* Số điện thoại phải bắt đầu bằng số 0")
        .max(10, "* Số điện thoại phải có 10 chữ số")
        .min(10, "* Số điện thoại phải có 10 chữ số")
        .required("* Bắt buộc")
    }),
    onSubmit: async (values) => {
      message.loading('Đang cập nhật...')

      try {
        const data = {
          fullname: values.fullname,
          address: values.address,
          phoneNumber: values.phoneNumber,
          email: newUser.email,
          username: newUser.username
        }
        console.log(data);

        const response = await userApi.updateUserProfile(user.id, data);
        message.destroy();
        message.success('Cập nhật thông tin thành công.');
        // console.log('Update successful:', response.data);
        setIsEdited(false);
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Cập nhật thông tin thất bại. Vui lòng thử lại!');
      }
    }
  })

  const toggleEdit = (e) => {
    e.preventDefault();
    if (isEdited) {
      // Khi đang chỉnh sửa và bấm "Lưu thông tin", gọi API
      // handleUpdate(e);
      formik.handleSubmit();
    } else {
      // Chuyển sang trạng thái chỉnh sửa
      setIsEdited(true);
    }
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   message.loading('Đang cập nhật...')
  //   try {
  //     // Gọi API để cập nhật thông tin
  //     console.log(newUser);

  //     const response = await userApi.updateUserProfile(user.id, newUser);
  //     message.destroy();
  //     message.success('Cập nhật thông tin thành công.');
  //     // console.log('Update successful:', response.data);
  //     setIsEdited(false);
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //     alert('Cập nhật thông tin thất bại. Vui lòng thử lại!');
  //   }
  // }

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewUser((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className='user_profile-container'>
      <form className="user_profile-form">
        <p>Username: </p>
        <input
          readOnly
          defaultValue={newUser?.username}
          style={{ color: isEdited ? '#a8a8a8' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'not-allowed'}
        />

        <p>Email: </p>
        <input
          readOnly
          defaultValue={newUser?.email}
          style={{ color: isEdited ? '#a8a8a8' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'not-allowed'}
        />

        <p>Họ tên: </p>
        <input
          name='fullname'
          // onChange={handleInputChange}
          readOnly={!isEdited}
          // value={newUser?.fullname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullname}
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />
        {formik.errors.fullname && formik.touched.fullname && (
          <p className="message-error">{formik.errors.fullname}</p>
        )}

        <p>Địa chỉ: </p>
        <input
          required
          name='address'
          readOnly={!isEdited}
          // onChange={handleInputChange}
          // value={newUser?.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />
        {formik.errors.address && formik.touched.address && (
          <p className="message-error">{formik.errors.address}</p>
        )}

        <p>Số điện thoại: </p>
        <input
          name='phoneNumber'
          readOnly={!isEdited}
          // value={newUser?.phoneNumber}
          // onChange={handleInputChange}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <p className="message-error">{formik.errors.phoneNumber}</p>
        )}

        <div className="update-save-btn">
          {/* <button onClick={toggleEdit} type="submit"> */}
          <button type="button" onClick={toggleEdit}>
            {isEdited ? 'Lưu thông tin' : 'Cập nhật thông tin'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserProfile