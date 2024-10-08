import {
    PlusOutlined,
    SearchOutlined,
    MoreOutlined,
    DeleteOutlined,
    EditOutlined,
    CloseOutlined,
    FilterOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, Input, Table } from 'antd'
import React, { useState } from 'react'
import '../AdminTheme.css'
import ModalCreate from './ModalCreate'

const themeCustome = {

}

export default function News() {
    const [moreEdit, setMoreEdit] = useState(null);
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [callback, setCallback] = useState(false);

    const dataNews = [
        {
            key: "1",
            id: "64d2e2b8f5e3e57e79d2c5f6",
            name: "Breaking News",
            date: "2024-08-20",
            views: 1500,
            createdAt: "2024-08-20T08:49:42.855Z",
            updatedAt: "2024-08-20T08:49:42.855Z"
        },
        {
            key: "2",
            id: "64d2e2b8f5e3e57e79d2c5f7",
            name: "Technology Advances",
            date: "2024-09-01",
            views: 2300,
            createdAt: "2024-09-01T09:00:00.000Z",
            updatedAt: "2024-09-01T09:00:00.000Z"
        },
        {
            key: "3",
            id: "64d2e2b8f5e3e57e79d2c5f8",
            name: "Sports Update",
            date: "2024-09-05",
            views: 1200,
            createdAt: "2024-09-05T10:15:30.000Z",
            updatedAt: "2024-09-05T10:15:30.000Z"
        },
        {
            key: "4",
            id: "64d2e2b8f5e3e57e79d2c5f9",
            name: "Health Tips",
            date: "2024-09-10",
            views: 800,
            createdAt: "2024-09-10T11:30:45.000Z",
            updatedAt: "2024-09-10T11:30:45.000Z"
        },
        {
            key: "5",
            id: "64d2e2b8f5e3e57e79d2c5fa",
            name: "Travel Guide",
            date: "2024-09-15",
            views: 950,
            createdAt: "2024-09-15T12:45:00.000Z",
            updatedAt: "2024-09-15T12:45:00.000Z"
        },
        {
            key: "6",
            id: "64d2e2b8f5e3e57e79d2c5fb",
            name: "Local Events",
            date: "2024-09-18",
            views: 670,
            createdAt: "2024-09-18T14:00:00.000Z",
            updatedAt: "2024-09-18T14:00:00.000Z"
        },
        {
            key: "7",
            id: "64d2e2b8f5e3e57e79d2c5fc",
            name: "Economic Update",
            date: "2024-09-20",
            views: 450,
            createdAt: "2024-09-20T15:15:30.000Z",
            updatedAt: "2024-09-20T15:15:30.000Z"
        },
        {
            key: "8",
            id: "64d2e2b8f5e3e57e79d2c5fd",
            name: "Celebrity Gossip",
            date: "2024-09-22",
            views: 2200,
            createdAt: "2024-09-22T16:30:45.000Z",
            updatedAt: "2024-09-22T16:30:45.000Z"
        },
        {
            key: "9",
            id: "64d2e2b8f5e3e57e79d2c5fe",
            name: "Science Discoveries",
            date: "2024-09-25",
            views: 780,
            createdAt: "2024-09-25T17:45:00.000Z",
            updatedAt: "2024-09-25T17:45:00.000Z"
        },
        {
            key: "10",
            id: "64d2e2b8f5e3e57e79d2c5ff",
            name: "World Politics",
            date: "2024-09-30",
            views: 1300,
            createdAt: "2024-09-30T18:00:00.000Z",
            updatedAt: "2024-09-30T18:00:00.000Z"
        }
    ];

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
        },
        {
            title: 'Options',
            key: 'pet_options',
            width: '200px',
            render: (text, record) => <>
                {moreEdit == record.key ?
                    <div className='edit-btn-option'>
                        <Button icon={<DeleteOutlined />} />
                        <Button icon={<EditOutlined />} />
                        <Button
                            size='small'
                            type='text'
                            onClick={() => setMoreEdit(null)}
                            icon={<CloseOutlined style={{ color: 'var(--color-font-admin)' }} />} />
                    </div> : <Button onClick={() => setMoreEdit(record.key)} icon={<MoreOutlined />} />}
            </>
        },
    ];

    const showModalCreate = () => {
        setIsOpenCreate(true);
    };
    const handleCancelCreate = () => {
        setIsOpenCreate(false);
    };

    return (
        <ConfigProvider theme={themeCustome}>
            <h1>Quản lý tin tức</h1>
            <div className="search">
                <Input
                    className='input-search'
                    size="large"
                    placeholder="Tìm kiếm theo tên..."
                    prefix={<SearchOutlined style={{ color: 'var(--color-font-admin)' }} />} />
                <button
                    className="btn-filter"
                // onClick={() => setIsModalFilterOpen(true)}
                >
                    <FilterOutlined />
                    <span>Filter</span>
                </button>
                <button className="create" onClick={showModalCreate} >
                    <PlusOutlined />
                    <span>Thêm tin tức</span>
                </button>
            </div>

            {/* modal */}
            <ModalCreate
                isOpenCreate={isOpenCreate}
                handleCancelCreate={handleCancelCreate}
                setIsOpenCreate={setIsOpenCreate}
                setCallback={setCallback}
            />

            <div className="table">
                <Table
                    columns={columns}
                    dataSource={dataNews}
                    pagination={{
                        pageSize: 10,
                    }}
                />
            </div>
        </ConfigProvider>
    )
}
