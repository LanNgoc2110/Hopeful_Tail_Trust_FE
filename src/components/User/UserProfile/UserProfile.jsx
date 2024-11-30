import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { getUserFromToken } from '../../../utils/Token';
import { userApi } from '../../../apis/user.request';

const UserProfile = () => {
  const { user } = getUserFromToken();

  const [isEdited, setIsEdited] = useState(false);
  const [newUser, setNewUser] = useState({
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
          fullname: response.data.data.fullname,
          address: response.data.data.address,
          phoneNumber: response.data.data.phoneNumber,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  const toggleEdit = (e) => {
    e.preventDefault();
    if (isEdited) {
      // Khi đang chỉnh sửa và bấm "Lưu thông tin", gọi API
      handleUpdate(e);
    } else {
      // Chuyển sang trạng thái chỉnh sửa
      setIsEdited(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Gọi API để cập nhật thông tin
      const response = await updateUserApi(user.id, newUser);
      console.log('Update successful:', response.data);

      // Thoát khỏi chế độ chỉnh sửa
      setIsEdited(false);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Cập nhật thông tin thất bại. Vui lòng thử lại!');
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className='user_profile-container'>
      <form className="user_profile-form">

        <p>Username: </p>
        <input
          readOnly
          defaultValue="JohnDoe"
          style={{ color: isEdited ? '#a8a8a8' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'not-allowed'}
        />

        <p>Email: </p>
        <input
          readOnly
          defaultValue="johndoe@example.com"
          style={{ color: isEdited ? '#a8a8a8' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'not-allowed'}
        />

        <p>Họ tên: </p>
        <input
          onChange={handleInputChange}
          readOnly={!isEdited}
          value={newUser.fullname}
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />

        <p>Địa chỉ: </p>
        <input
          readOnly={!isEdited}
          defaultValue="123 Đường ABC, TP.HCM"
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />

        <p>Số điện thoại: </p>
        <input
          readOnly={!isEdited}
          defaultValue="0912345678"
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />

        <div className="update-save-btn">
          <button onClick={toggleEdit} type="submit">
            {isEdited ? 'Lưu thông tin' : 'Cập nhật thông tin'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserProfile