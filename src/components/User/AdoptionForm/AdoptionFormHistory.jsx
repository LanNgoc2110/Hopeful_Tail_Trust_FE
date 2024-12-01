import React, { useEffect, useState } from 'react';
import './AdoptionFormHistory.css';
import { Button, Empty, message, Pagination, Spin, Tag } from 'antd';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { adoptionApi } from '../../../apis/adoption.request';
import { petApi } from '../../../apis/pet.request';
import optionStatusAdopt from '../../../data/optionStatusAdopt.json';

const AdoptionFormHistory = () => {
    // Dữ liệu giả cho bảng
    const data = [
        {
            id: '1',
            petFormInfo: 'Đơn xin nhận nuôi bé Pitbull - Đực - 5 tuổi',
            status: 'Chờ duyệt',
        },
        {
            id: '2',
            petFormInfo: 'Đơn xin nhận nuôi bé Mèo Anh - Cái - 2 tuổi',
            status: 'Đã duyệt',
        },
        {
            id: '3',
            petFormInfo: 'Đơn xin nhận nuôi bé Chó Poodle - Đực - 3 tuổi',
            status: 'Từ chối',
        },
        {
            id: '4',
            petFormInfo: 'Đơn xin nhận nuôi bé Husky - Đực - 4 tuổi',
            status: 'Chờ duyệt',
        },
        {
            id: '5',
            petFormInfo: 'Đơn xin nhận nuôi bé Mèo Ba Tư - Cái - 1 tuổi',
            status: 'Đã duyệt',
        },
        {
            id: '6',
            petFormInfo: 'Đơn xin nhận nuôi bé Chó Shiba Inu - Đực - 6 tuổi',
            status: 'Từ chối',
        },
        {
            id: '7',
            petFormInfo: 'Đơn xin nhận nuôi bé Chó Cocker Spaniel - Cái - 2 tuổi',
            status: 'Chờ duyệt',
        },
        {
            id: '8',
            petFormInfo: 'Đơn xin nhận nuôi bé Mèo Scottish Fold - Đực - 3 tuổi',
            status: 'Đã duyệt',
        },
        {
            id: '9',
            petFormInfo: 'Đơn xin nhận nuôi bé Mèo Ragdoll - Cái - 4 tuổi',
            status: 'Từ chối',
        },
        {
            id: '10',
            petFormInfo: 'Đơn xin nhận nuôi bé Poodle - Đực - 2 tuổi',
            status: 'Chờ duyệt',
        },
        {
            id: '11',
            petFormInfo: 'Đơn xin nhận nuôi bé James - Đực - 2 tuổi',
            status: 'Chờ duyệt',
        },
    ];

    const [loading, setLoading] = useState(false);
    const [adoptions, setAdoptions] = useState([]);
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchAdoptions = async () => {
            setLoading(true);
            try {
                const res = await adoptionApi.getAllAdoption();
                // console.log(res);
                setAdoptions(res.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                // message.error(error.response.data.message);
                console.log(error.response.data.message);
            }
        }
        fetchAdoptions();

        const fetchPet = async () => {
            try {
                const res = await petApi.getAllPets();
                // console.log(res);
                setPets(res.data.data);
                // setLoading(false);
            } catch (error) {
                // setLoading(false);
                // message.error(error.response.data.message);
                console.log(error.response.data.message);
            }
        }
        fetchPet();
    }, []);

    // Sắp xếp dữ liệu mới nhất ở trên đầu
    const sortedData = adoptions?.sort((a, b) => b.id - a.id);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Lấy dữ liệu hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Kiểm tra nếu `currentPage` được truyền qua `state`
        if (location.state?.currentPage) {
            setCurrentPage(location.state.currentPage);
        }
    }, [location.state]);


    // const getStatusStyle = (status) => {
    //     switch (status) {
    //         case 'Đã duyệt':
    //             return { color: 'green', text: 'Đã duyệt' };
    //         case 'Từ chối':
    //             return { color: 'red', text: 'Từ chối' };
    //         case 'Chờ duyệt':
    //             return { color: 'gray', text: 'Chờ duyệt' };
    //         default:
    //             return { color: 'black', text: status };
    //     }
    // };

    const renderStatus = (status) => {
        const matchedOption = optionStatusAdopt.find(option => option.value === status);
        return matchedOption ? (
            <Tag color={matchedOption.color}>
                {matchedOption.label}
            </Tag>
        ) : (
            status
        );
    }

    return (
        <div className="adoption_form_history-container">
            {loading ? (
                <div style={{ textAlign: 'center' }}>
                    <Spin
                        indicator={
                            <LoadingOutlined
                                style={{
                                    margin: 150,
                                    fontSize: 100,
                                    color: 'var(--color-btn-auth)'
                                }}
                                spin />
                        }
                    />
                </div>
            ) : (
                <>
                    <table className='adoption_form_history-table'>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <p>Thông tin đơn nhận nuôi</p>
                                </th>
                                <th>
                                    <p>Trạng thái</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className='no-data'>
                                        <Empty description="Chưa có đơn xin nhận nuôi thú cưng nào cần được xét duyệt" />
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <Button onClick={() => navigate(`/user/adoption-form-history/${item._id}`, { state: { currentPage: currentPage } })}>
                                                <EyeOutlined />
                                            </Button>
                                        </td>
                                        <td>
                                            <p>Đơn xin nhận nuôi bé {pets.find((pet) => pet._id === item.pet)?.name} - {pets.find((pet) => pet._id === item.pet)?.breed} - {pets.find((pet) => pet._id === item.pet)?.age} tuổi</p>
                                        </td>
                                        <td>
                                            {/* <p style={{ color: getStatusStyle(item.status).color }}>
                                        {getStatusStyle(item.status).text}
                                    </p> */}
                                            {renderStatus(item.status)}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    <Pagination
                        current={currentPage}
                        pageSize={itemsPerPage}
                        total={sortedData.length}
                        showQuickJumper
                        showTotal={(total) => `Tổng: ${total} đơn nhận nuôi`}
                        onChange={handlePageChange}
                        style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}
                    />
                </>
            )}
        </div>
    );
};

export default AdoptionFormHistory;
