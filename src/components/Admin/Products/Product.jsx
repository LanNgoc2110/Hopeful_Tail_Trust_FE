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

export default function Product() {
    const [moreEdit, setMoreEdit] = useState(null);
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [callback, setCallback] = useState(false);

    const dataProducts = [
        {
            key: '1',
            description: 'Red T-shirt',
            stock: 50,
            sold: 120,
            productCode: 'RT001',
            dateAdded: '2023-01-15',
        },
        {
            key: '2',
            description: 'Blue Jeans',
            stock: 30,
            sold: 80,
            productCode: 'BJ002',
            dateAdded: '2023-02-20',
        },
        {
            key: '3',
            description: 'Black Sneakers',
            stock: 25,
            sold: 60,
            productCode: 'BS003',
            dateAdded: '2023-03-05',
        },
        {
            key: '4',
            description: 'Green Hoodie',
            stock: 40,
            sold: 90,
            productCode: 'GH004',
            dateAdded: '2023-03-25',
        },
        {
            key: '5',
            description: 'Yellow Cap',
            stock: 70,
            sold: 200,
            productCode: 'YC005',
            dateAdded: '2023-04-10',
        },
        {
            key: '6',
            description: 'White Socks',
            stock: 100,
            sold: 300,
            productCode: 'WS006',
            dateAdded: '2023-04-15',
        },
        {
            key: '7',
            description: 'Purple Scarf',
            stock: 20,
            sold: 50,
            productCode: 'PS007',
            dateAdded: '2023-05-01',
        },
        {
            key: '8',
            description: 'Brown Belt',
            stock: 60,
            sold: 110,
            productCode: 'BB008',
            dateAdded: '2023-05-20',
        },
        {
            key: '9',
            description: 'Orange Gloves',
            stock: 15,
            sold: 45,
            productCode: 'OG009',
            dateAdded: '2023-06-01',
        },
        {
            key: '10',
            description: 'Pink Backpack',
            stock: 35,
            sold: 70,
            productCode: 'PB010',
            dateAdded: '2023-06-15',
        },
    ];

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
        },
        {
            title: 'Product Code',
            dataIndex: 'productCode',
            key: 'productCode',
        },
        {
            title: 'Date Added',
            dataIndex: 'dateAdded',
            key: 'dateAdded',
        },
        {
            title: 'Options',
            key: 'options',
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
            <h1>Quản lý sản phẩm</h1>
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
                    <span>Thêm sản phẩm mới</span>
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
                    dataSource={dataProducts}
                    pagination={{
                        pageSize: 10,
                    }}
                />
            </div>
        </ConfigProvider>
    )
}
