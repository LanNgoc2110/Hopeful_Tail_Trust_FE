import { Button, Input, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    EyeOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { adoptionApi } from '../../../apis/adoption.request';
import optionStatusAdopt from '../../../data/optionStatusAdopt.json';
import '../AdminTheme.css'
import { petApi } from '../../../apis/pet.request';

export default function AdoptionFormList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [data, setData] = useState([]);
    const [pet, setPet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })

    useEffect(() => {
        const fetchAdoptedPets = async () => {
            try {
                const response = await adoptionApi.getAllAdoption();
                // console.log(response.data);
                const uniquePetIds = [...new Set(response.data.data.map(item => item.pet))];

                // Bước 2: Dùng map để gọi API getPetById cho từng petId
                const petPromises = uniquePetIds.map(async (id) => {
                    try {
                        const petResponse = await petApi.getPetById(id);
                        return petResponse.data.data; // Trả về dữ liệu pet
                    } catch (error) {
                        console.error(`Error fetching pet with ID ${id}:`, error);
                        return null; // Trả về null nếu lỗi
                    }
                });

                const pets = await Promise.all(petPromises);
                const filteredPets = pets.filter(pet => pet !== null);

                setPet(filteredPets);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching adopted pets:', error);
            }
        }
        fetchAdoptedPets();
    }, [])

    const columns = [
        {
            title: 'Tên thú cưng',
            dataIndex: 'pet',
            key: 'pet_name',

            render: (text) => {
                const matchedOption = pet.find(option => option._id === text);
                return matchedOption ? matchedOption.name : text;
            }
        },
        {
            title: 'Tên người nhận nuôi',
            dataIndex: 'name',
            key: 'pet_name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'CCCD',
            dataIndex: 'cccd',
            key: 'cccd',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                const matchedOption = optionStatusAdopt.find(option => option.value === status);
                return matchedOption ? (
                    <Tag color={matchedOption.color}>
                        {matchedOption.label}
                    </Tag>
                ) : (
                    status
                );
            }
        },
        {
            title: 'Options',
            key: 'pet_options',
            width: '200px',
            render: (text, record) =>
                <Button onClick={() => navigate(`/admin/adopted-management/${record._id}`)} icon={<EyeOutlined />} />
        },
    ];

    const filteredData = data.filter(item => {
        // Tìm thú cưng dựa trên `item.pet`
        const matchedPet = pet.find(p => p._id === item.pet);

        // Kiểm tra tên người nhận nuôi hoặc tên thú cưng khớp với từ khóa tìm kiếm
        const isMatchName = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const isMatchPetName = matchedPet && matchedPet.name.toLowerCase().includes(searchTerm.toLowerCase());

        return isMatchName || isMatchPetName;
    });
    
    return (
        <div>
            <div>
                <h1>Danh sách đơn nhận nuôi</h1>
            </div>
            <div className="search" style={{ gap: '20px' }}>
                <Input
                    allowClear
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='input-search'
                    size="large"
                    placeholder="Tìm kiếm theo tên..."
                    prefix={<SearchOutlined style={{ color: 'var(--color-font-admin)' }} />} />
            </div>
            <div className="table">
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: 5,
                        total: data.length,
                        showQuickJumper: true,
                        onChange: (page, pageSize) => {
                            setPagination({
                                current: page,
                                pageSize: pageSize
                            })
                        }
                    }}
                    title={() => (
                        <div>
                            Tổng số đơn xin nhận nuôi: {filteredData.length}
                        </div>
                    )}
                />
            </div>
        </div>
    )
}
