import React, { useState } from 'react'
import './UserProfile.css'

const UserProfile = () => {
  const [isEdited, setIsEdited] = useState(false);

  const toggleEdit = () => {
    setIsEdited((prevState) => !prevState);
  };

  return (
    <div className='user_profile-container'>
      <div className="user_profile-content">

        <p>Username: </p>
        <input
          readOnly={!isEdited}
          defaultValue="JohnDoe"
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
        />

        <p>Email: </p>
        <input
          readOnly={!isEdited}
          defaultValue="johndoe@example.com"
          style={{ color: isEdited ? '#000000' : '#a8a8a8' }}
          onMouseEnter={(e) => !isEdited && (e.target.style.cursor = 'not-allowed')}
          onMouseLeave={(e) => e.target.style.cursor = 'auto'}
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
          <button onClick={toggleEdit}>
            {isEdited ? 'Lưu thông tin' : 'Cập nhật thông tin'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile