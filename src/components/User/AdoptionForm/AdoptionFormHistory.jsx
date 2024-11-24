import React, { useEffect, useState } from 'react';
import './AdoptionFormHistory.css';
import { Button, Pagination } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

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

    // Sắp xếp dữ liệu mới nhất ở trên đầu
    const sortedData = data.sort((a, b) => b.id - a.id);

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


    const getStatusStyle = (status) => {
        switch (status) {
            case 'Đã duyệt':
                return { color: 'green', text: 'Đã duyệt' };
            case 'Từ chối':
                return { color: 'red', text: 'Từ chối' };
            case 'Chờ duyệt':
                return { color: 'gray', text: 'Chờ duyệt' };
            default:
                return { color: 'black', text: status };
        }
    };

    return (
        <div className="adoption_form_history-container">
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
                    {currentData.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Button onClick={() => navigate(`/user/adoption-form-history/${item.id}`, { state: { currentPage: currentPage } })}>
                                    <EyeOutlined />
                                </Button>
                            </td>
                            <td>

                                <p>{item.petFormInfo}</p>
                            </td>
                            <td>
                                <p style={{ color: getStatusStyle(item.status).color }}>
                                    {getStatusStyle(item.status).text}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={sortedData.length}
                showQuickJumper
                showTotal={(total) => `Total ${total} adoption forms`}
                onChange={handlePageChange}
                style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}
            />
        </div>
    );
};

export default AdoptionFormHistory;
