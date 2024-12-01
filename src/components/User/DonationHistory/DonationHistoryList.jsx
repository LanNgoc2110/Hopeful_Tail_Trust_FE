import React, { useEffect, useState } from 'react';
import './DonationHistoryList.css';
import {
    LoadingOutlined
} from '@ant-design/icons';
import { Empty, Pagination, Spin, Tag } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { fundApi } from '../../../apis/fund.request';
import { getToken, getUserFromToken } from '../../../utils/Token';

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
    const { user } = getUserFromToken();
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchFundList = async () => {
            try {
                const res = await fundApi.getAllFunds();
                // console.log(res.data.data.funds);
                const fundsData = res.data.data.funds;
                if (!fundsData) {
                    throw new Error("Funds data không tồn tại hoặc sai cấu trúc.");
                }

                const userFunds = fundsData.filter((fund) => fund.user && fund.user?._id === user.id);
                // console.log(userFunds);

                if (userFunds) {
                    setFunds(userFunds);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
        fetchFundList();
    }, []);

    // Sắp xếp dữ liệu mới nhất ở trên đầu
    // const sortedData = data.sort((a, b) => b.id - a.id);

    // State cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Lấy dữ liệu hiện tại
    const startIndex = (currentPage - 1) * itemsPerPage;
    // const currentData = sortedData.slice(startIndex, startIndex + itemsPerPage);
    const currentData = funds.slice(startIndex, startIndex + itemsPerPage);

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
            case 'approved':
                return { color: 'green', text: 'Thành công' };
            case 'rejected':
                return { color: 'red', text: 'Hủy' };
            case 'pending':
                return { color: 'blue', text: 'Chờ xử lý' };
            default:
                return { color: 'black', text: status };
        }
    };

    return (
        <div className="donation_history-container">
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
                <table className='donation_history-table'>
                    <thead>
                        <tr>
                            <th>
                                <p>Mã giao dịch</p>
                            </th >
                            <th>
                                <p>Số tiền quyên góp</p>
                            </th>
                            <th>
                                {/* <p>Thời gian quyên góp</p> */}
                            </th>
                            <th>
                                <p>Trạng thái</p>
                            </th>
                        </tr >
                    </thead >
                    <tbody>
                        {currentData.length === 0 ? (
                            <tr>
                                <td colSpan={4} className='no-data'>
                                    <Empty description="Bạn vẫn chưa có lần quyên góp nào!" />
                                </td>
                            </tr>
                        ) : (
                            currentData.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <p>{item.orderCode}</p>
                                    </td>
                                    <td>
                                        <p>{item.amount.toLocaleString('vi-VN')} VND</p>
                                    </td>
                                    <td>
                                        {/* <p>{item.donationTime}</p> */}
                                    </td>
                                    <td>
                                        {/* <p style={{ color: getStatusStyle(item.status).color }}>
                                        {getStatusStyle(item.status).text}
                                    </p> */}
                                        <Tag color={getStatusStyle(item.status).color}>
                                            {getStatusStyle(item.status).text}
                                        </Tag>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table >
            )}

            {loading ? (
                <></>
            ) : (
                <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={funds?.length}
                onChange={handlePageChange}
                showQuickJumper
                showTotal={(total) => `Tổng: ${total} giao dịch`}
                style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}
            />
            )}
        </div >
    );
};

export default DonationHistoryList;
