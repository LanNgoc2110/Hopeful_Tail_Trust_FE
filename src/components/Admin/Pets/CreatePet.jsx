import React, { useState } from 'react'
import {
  LoadingOutlined,
  InboxOutlined,
  BaiduOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Input, InputNumber, message, Select, Upload } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import './Pet.css'
import optionSex from '../../../data/optionSex.json'
import optionSpecies from '../../../data/optionSpecies.json'
import optionVaccinated from '../../../data/optionVaccinated.json'
import optionHealthStatus from '../../../data/optionHealthStatus.json'
import { mediaApi } from '../../../apis/media.request'
import { petApi } from '../../../apis/pet.request'

const { TextArea } = Input
const { Dragger } = Upload;

export default function CreatePet() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null);
  const [pet, setPet] = useState({
    name: "",
    sex: "",
    age: 0,
    species: "",
    coatColor: "",
    breed: "",
    description: "",
    vaccinated: 0,
    healthStatus: "",
    image_id: "",
    location: ""
  })

  const props = {
    name: 'file',
    multiple: false,
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      const formData = new FormData(); // Tạo FormData để gửi dữ liệu file
      formData.append('files', file);

      try {
        const response = await mediaApi.uploadImage(formData); // Gọi API upload
        // console.log(response.data);
        setImage(response.data.url)
        setPet({ ...pet, image_id: response.data.id })
        message.success(`${file.name} file uploaded successfully.`);
        onSuccess(response.data); // Gọi callback thành công của Ant Design
      } catch (error) {
        onError(error); // Gọi callback thất bại của Ant Design
        message.error(`${file.name} file upload failed.`);
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        console.log('Uploading file...');
      }
      if (status === 'done') {
        console.log('File upload successful');
      } else if (status === 'error') {
        console.error('File upload failed:', info.file);
      }
    },
    async onRemove(file) {
      try {
        const response = await mediaApi.deleteImage(pet.image_id); // Gọi API upload
        // console.log(response.data);
        setImage(null)
        setPet({ ...pet, image_id: "" })
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }

  };

  const handleAddPet = async () => {
    setIsLoading(true)
    try {
      const res = await petApi.addPet(pet)
      message.success('Thêm thú cưng thành công');
      navigate('/admin/manage-pet')
      setIsLoading(false)
    } catch (error) {
      message.error(error.response.data.message);
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '1% 2%' }}>
      <div className="back-to-pet-list">
        <Breadcrumb
          items={[
            { title: <Link to="/admin/manage-pet"><BaiduOutlined /> Danh sách thú cưng</Link> },
            { title: "Tạo mới thú cưng" }
          ]}
        />
      </div>

      <div className='create-pet-container'>
        <h1 style={{ width: '100%' }}>Thêm thú cưng</h1>
        <div className='create-pet-left-container'>
          <Dragger {...props}>
            {!image ? (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp chuột hoặc kéo thả file ảnh tại đây</p>
                <p className="ant-upload-hint">
                  Hỗ trợ tải lên một lần. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
                </p>
              </>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <img src={image} style={{ width: '100%' }} />
              </div>
            )}
          </Dragger>
        </div>
        <div className='create-pet-right-container'>
          <div className='pet-info'>
            <Input
              onChange={(e) => setPet({ ...pet, name: e.target.value })}
              style={{ width: '48%' }}
              size="large"
              placeholder="Tên"
            />
            <Input
              onChange={(e) => setPet({ ...pet, coatColor: e.target.value })}
              style={{ width: '48%' }}
              size="large"
              placeholder="Màu lông"
            />
          </div>
          <div className='pet-info'>
            <Select
              style={{ width: '48%' }}
              size='large'
              placeholder='Giới tính'
              onChange={(e) => setPet({ ...pet, sex: e || "" })}
              options={optionSex}
            />
            <InputNumber
              onChange={(e) => setPet({ ...pet, age: e })}
              style={{ width: '48%' }}
              size='large'
              placeholder='Tuổi'
            />
          </div>
          <div className='pet-info'>
            <Select
              style={{ width: '48%' }}
              size='large'
              placeholder='Loài'
              onChange={(e) => setPet({ ...pet, species: e || "" })}
              options={optionSpecies}
            />
            <Input
              onChange={(e) => setPet({ ...pet, breed: e.target.value })}
              style={{ width: '48%' }}
              size="large"
              placeholder="Giống"
            />
          </div>
          <div className='pet-info'>
            <Select
              style={{ width: '48%' }}
              size='large'
              placeholder='Tiêm ngừa'
              onChange={(e) => setPet({ ...pet, vaccinated: e || 0 })}
              options={optionVaccinated}
            />
            <Select
              style={{ width: '48%' }}
              size='large'
              placeholder='Tình trạng sức khỏe'
              onChange={(e) => setPet({ ...pet, healthStatus: e || 0 })}
              options={optionHealthStatus}
            />
            {/* <Input
              onChange={(e) => setPet({ ...pet, healthStatus: e.target.value })}
              style={{ width: '48%' }}
              size="large"
              placeholder="Tình trạng sức khỏe"
            /> */}
          </div >
          <Input
            onChange={(e) => setPet({ ...pet, location: e.target.value })}
            style={{ marginBottom: '15px' }}
            size="large"
            placeholder="Địa chỉ"
          />
          <TextArea
            onChange={(e) => setPet({ ...pet, description: e.target.value })}
            size="large"
            placeholder="Miêu tả"
          />
        </div>
        <div className='create-pet-btn'>
          {/* <button>Thêm thú cưng</button> */}
          <Button
            disabled={isLoading}
            onClick={() => handleAddPet()}
            type="primary"
            size='large'>{isLoading && <LoadingOutlined style={{ marginRight: '10px' }} />} Thêm thú cưng</Button>
        </div>
      </div>
    </div>
  )
}
