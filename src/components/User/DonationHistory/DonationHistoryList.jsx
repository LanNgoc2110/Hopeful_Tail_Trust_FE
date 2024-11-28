import React, { useEffect, useState } from 'react';
import './DonationHistoryList.css';
import { Button, Pagination } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const DonationHistoryList = () => {
    // Dữ liệu giả cho bảng đơn hàng
    const data = [
        {
            id: '1',
            donationCode: 'ABC123',
            donationPrice: 100000,
            donationTime: '2024-09-01 0:30',
            status: 'Chờ xử lý',
        },
        {
            id: '2',
            donationCode: 'DEF456',
            donationPrice: 200000,
            donationTime: '2024-03-15 10:45',
            status: 'Thành công',
        },
        {
            id: '3',
            donationCode: 'GHI789',
            donationPrice: 250000,
            donationTime: '2024-06-12 14:00',
            status: 'Hủy',
        },
        {
            id: '4',
            donationCode: 'JKL012',
            donationPrice: 500000,
            donationTime: '2024-11-09 09:15',
            status: 'Chờ xử lý',
        },
        {
            id: '5',
            donationCode: 'MNO345',
            donationPrice: 1000000,
            donationTime: '2024-08-22 20:00',
            status: 'Thành công',
        },
        {
            id: '6',
            donationCode: 'PQR678',
            donationPrice: 400000,
            donationTime: '2024-05-30 17:30',
            status: 'Hủy',
        },
        {
            id: '7',
            donationCode: 'STU901',
            donationPrice: 10000,
            donationTime: '2024-02-11 13:00',
            status: 'Chờ xử lý',
        },
        {
            id: '8',
            donationCode: 'VWX234',
            donationPrice: 127000,
            donationTime: '2024-04-25 22:15',
            status: 'Thành công',
        },
        {
            id: '9',
            donationCode: 'YZA567',
            donationPrice: 75000,
            donationTime: '2024-07-14 19:45',
            status: 'Hủy',
        },
        {
            id: '10',
            donationCode: 'BCD890',
            donationPrice: 800000,
            donationTime: '2024-10-06 11:30',
            status: 'Chờ xử lý',
        },
        {
            id: '11',
            donationCode: 'EFG012',
            donationPrice: 150000,
            donationTime: '2024-01-18 08:00',
            status: 'Thành công',
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
            case 'Thành công':
                return { color: 'green', text: 'Thành công' };
            case 'Hủy':
                return { color: 'red', text: 'Hủy' };
            case 'Chờ xử lý':
                return { color: 'blue', text: 'Chờ xử lý' };
            default:
                return { color: 'black', text: status };
        }
    };

    return (
        <div className="donation_history-container">
            <table className='donation_history-table'>
                <thead>
                    <tr>
                        <th>
                            <p>Mã giao dịch</p>
                        </th>
                        <th>
                            <p>Số tiền thanh toán</p>
                        </th>
                        <th>
                            <p>Thời gian thanh toán</p>
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
                                <p>{item.donationCode}</p>
                            </td>
                            <td>
                                <p>{item.donationPrice.toLocaleString('vi-VN')} VND</p>
                            </td>
                            <td>
                                <p>{item.donationTime}</p>
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
                onChange={handlePageChange}
                showQuickJumper
                showTotal={(total) => `Total ${total} invoices`}
                style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}
            />
        </div>
    );
};

export default DonationHistoryList;
