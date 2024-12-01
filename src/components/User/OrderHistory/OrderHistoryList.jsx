import React, { useEffect, useState } from 'react';
import './OrderHistoryList.css';
import { Button, Empty, Pagination, Spin, Tag } from 'antd';
import { EyeOutlined, LoadingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { invoiceApi } from '../../../apis/invoice.request';
import optionStatusPayment from '../../../data/optionStatusPayment.json';

const OrderHistoryList = () => {
    // Dữ liệu giả cho bảng đơn hàng
    const data = [
        {
            id: '1',
            productOrderInfo: 'Đơn hàng mã ABC123 thanh toán lúc 0:30',
            status: 'Đang giao',
        },
        {
            id: '2',
            productOrderInfo: 'Đơn hàng mã DEF456 thanh toán lúc 10:45',
            status: 'Đã giao',
        },
        {
            id: '3',
            productOrderInfo: 'Đơn hàng mã GHI789 thanh toán lúc 14:00',
            status: 'Hủy',
        },
        {
            id: '4',
            productOrderInfo: 'Đơn hàng mã JKL012 thanh toán lúc 9:15',
            status: 'Đang giao',
        },
        {
            id: '5',
            productOrderInfo: 'Đơn hàng mã MNO345 thanh toán lúc 20:00',
            status: 'Đã giao',
        },
        {
            id: '6',
            productOrderInfo: 'Đơn hàng mã PQR678 thanh toán lúc 17:30',
            status: 'Hủy',
        },
        {
            id: '7',
            productOrderInfo: 'Đơn hàng mã STU901 thanh toán lúc 13:00',
            status: 'Đang giao',
        },
        {
            id: '8',
            productOrderInfo: 'Đơn hàng mã VWX234 thanh toán lúc 22:15',
            status: 'Đã giao',
        },
        {
            id: '9',
            productOrderInfo: 'Đơn hàng mã YZA567 thanh toán lúc 19:45',
            status: 'Hủy',
        },
        {
            id: '10',
            productOrderInfo: 'Đơn hàng mã BCD890 thanh toán lúc 11:30',
            status: 'Đang giao',
        },
        {
            id: '11',
            productOrderInfo: 'Đơn hàng mã EFG012 thanh toán lúc 8:00',
            status: 'Đã giao',
        },
    ];

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchOrders = async () => {
            try {
                const res = await invoiceApi.getOrders();
                // console.log(res);

                // const invoicesData = res.data.data;
                // if (!invoicesData) {
                //     throw new Error("Invoices data không tồn tại hoặc sai cấu trúc.");
                // }

                // const userFunds = invoicesData.filter((invoice) => invoice.user && invoice.user?._id === user.id);
                // // console.log(userFunds);

                // if (userFunds) {
                //     setFunds(userFunds);
                // }
                setInvoices(res.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error.response.data.message);

            }
        }
        fetchOrders();
    }, []);

    // Sắp xếp dữ liệu mới nhất ở trên đầu
    // const sortedData = data.sort((a, b) => b.id - a.id);
    const sortedData = invoices?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
            case 'Đã giao':
                return { color: 'green', text: 'Đã giao' };
            case 'Hủy':
                return { color: 'red', text: 'Hủy' };
            case 'Đang giao':
                return { color: 'blue', text: 'Đang giao' };
            default:
                return { color: 'black', text: status };
        }
    };

    const renderStatus = (status) => {
        const matchedOption = optionStatusPayment.find(option => option.value === status);
        return matchedOption ? (
            <Tag color={matchedOption.color}>
                {matchedOption.label}
            </Tag>
        ) : (
            status
        );
    }

    return (
        <div className="order_history-container">
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
                    <table className='order_history-table'>
                        <thead>
                            <tr>
                                <th colSpan={2}>
                                    <p>Thông tin đơn hàng</p>
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
                                        <Empty description="Chưa có hóa đơn mua hàng nào" />
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <Button onClick={() => navigate(`/user/order-history-list/${item._id}`, { state: { currentPage: currentPage, order: item } })}>
                                                <EyeOutlined />
                                            </Button>
                                        </td>
                                        <td>
                                            <p>Đơn hàng mã <span>{item.orderCode}</span> đã đặt lúc <span>{item.createdAt}</span> </p>
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
                        onChange={handlePageChange}
                        showQuickJumper
                        showTotal={(total) => `Tổng: ${total} hóa đơn`}
                        style={{ marginTop: '16px', textAlign: 'center', justifyContent: 'center' }}
                    />
                </>
            )}
        </div>
    );
};

export default OrderHistoryList;
