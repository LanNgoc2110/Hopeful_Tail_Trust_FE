import React, { useEffect } from 'react'
import {
    LoadingOutlined,
    InboxOutlined,
    BaiduOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Input, InputNumber, message, Select, Upload } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Pet.css'
import optionSex from '../../../data/optionSex.json'
import optionSpecies from '../../../data/optionSpecies.json'
import optionVaccinated from '../../../data/optionVaccinated.json'
import optionHealthStatus from '../../../data/optionHealthStatus.json'
import { mediaApi } from '../../../apis/media.request'
import { petApi } from '../../../apis/pet.request'
import { useDispatch } from 'react-redux'

const { TextArea } = Input
const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: false,
    customRequest: async (options) => {
        const { file, onSuccess, onError } = options;
        const formData = new FormData(); // Tạo FormData để gửi dữ liệu file
        formData.append('files', file);
        console.log(file);

        try {
            const response = await mediaApi.uploadImage(formData); // Gọi API upload
            onSuccess(response.data); // Gọi callback thành công của Ant Design
            message.success(`${file.name} file uploaded successfully.`);
        } catch (error) {
            console.log(error);

            onError(error); // Gọi callback thất bại của Ant Design
            message.error(`${file.name} file upload failed.`);
        }
    },
    onChange(info) {
        const { status } = info.file;
        if (status === 'uploading') {
            console.log('Uploading file...', info.file);
        }
        if (status === 'done') {
            console.log('File upload successful:', info.file);
        } else if (status === 'error') {
            console.error('File upload failed:', info.file);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function EditPet() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = React.useState(false)
    const [pet, setPet] = React.useState(null)

    const id = useParams().id;

    useEffect(() => {
        // Gọi API để lấy dữ liệu pet theo ID
        const fetchPet = async () => {
            try {
                const res = await petApi.getPetById(id);
                setPet({
                    name: res.data.data.name,
                    sex: res.data.data.sex,
                    age: res.data.data.age,
                    species: res.data.data.species,
                    coatColor: res.data.data.coatColor,
                    breed: res.data.data.breed,
                    description: res.data.data.description,
                    vaccinated: res.data.data.vaccinated,
                    healthStatus: res.data.data.healthStatus,
                    image_id: res.data.data.image.id,
                    location: res.data.data.location
                });
            } catch (error) {
                message.error('Không thể lấy thông tin thú cưng.');
            }
        };
        fetchPet();
    }, [id]);

    const handleUpdatePet = async () => {
        setIsLoading(true)
        try {
            const res = await petApi.updatePet(id, pet)
            message.success('Cập nhật thú cưng thành công');
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
                        { title: "Cập nhật thú cưng" }
                    ]}
                />
            </div>

            <div className='create-pet-container'>
                <h1 style={{ width: '100%' }}>Cập nhật thú cưng</h1>
                <div className='create-pet-left-container'>
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </div>
                <div className='create-pet-right-container'>
                    <div className='pet-info'>
                        <Input
                            value={pet?.name}
                            onChange={(e) => setPet({ ...pet, name: e.target.value })}
                            style={{ width: '48%' }}
                            size="large"
                            placeholder="Tên"
                        />
                        <Input
                            value={pet?.coatColor}
                            onChange={(e) => setPet({ ...pet, coatColor: e.target.value })}
                            style={{ width: '48%' }}
                            size="large"
                            placeholder="Màu lông"
                        />
                    </div>
                    <div className='pet-info'>
                        <Select
                            value={pet?.sex}
                            style={{ width: '48%' }}
                            size='large'
                            placeholder='Giới tính'
                            onChange={(e) => setPet({ ...pet, sex: e || "" })}
                            options={optionSex}
                        />
                        <InputNumber
                            value={pet?.age}
                            onChange={(e) => setPet({ ...pet, age: e })}
                            style={{ width: '48%' }}
                            size='large'
                            placeholder='Tuổi'
                        />
                    </div>
                    <div className='pet-info'>
                        <Select
                            value={pet?.species}
                            style={{ width: '48%' }}
                            size='large'
                            placeholder='Loài'
                            onChange={(e) => setPet({ ...pet, species: e || "" })}
                            options={optionSpecies}
                        />
                        <Input
                            value={pet?.breed}
                            onChange={(e) => setPet({ ...pet, breed: e.target.value })}
                            style={{ width: '48%' }}
                            size="large"
                            placeholder="Giống"
                        />
                    </div>
                    <div className='pet-info'>
                        <Select
                            value={pet?.vaccinated}
                            style={{ width: '48%' }}
                            size='large'
                            placeholder='Tiêm ngừa'
                            onChange={(e) => setPet({ ...pet, vaccinated: e || 0 })}
                            options={optionVaccinated}
                        />
                        <Select
                            value={pet?.healthStatus}
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
                        value={pet?.location}
                        onChange={(e) => setPet({ ...pet, location: e.target.value })}
                        style={{ marginBottom: '15px' }}
                        size="large"
                        placeholder="Địa chỉ"
                    />
                    <TextArea
                        value={pet?.description}
                        onChange={(e) => setPet({ ...pet, description: e.target.value })}
                        size="large"
                        placeholder="Miêu tả"
                    />
                </div>
                <div className='create-pet-btn'>
                    <Button
                        disabled={isLoading}
                        onClick={() => handleUpdatePet()}
                        type="primary"
                        size='large'>{isLoading && <LoadingOutlined style={{ marginRight: '10px' }} />} Cập nhật</Button>
                </div>
            </div>
        </div>
    )
}
