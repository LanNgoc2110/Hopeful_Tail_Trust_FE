import React, { useState } from 'react'
import './UserProfile.css'

const UserProfile = () => {
  const [isEdited, setIsEdited] = useState(false);

  const toggleEdit = () => {
    setIsEdited((prevState) => !prevState);
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
          readOnly={!isEdited}
          defaultValue="Nguyễn Văn A"
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