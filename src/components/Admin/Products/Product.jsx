import {
    PlusOutlined,
    SearchOutlined,
    MoreOutlined,
    DeleteOutlined,
    EditOutlined,
    CloseOutlined,
    FilterOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, Input, InputNumber, message, Popconfirm, Select, Switch, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import '../AdminTheme.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getProductsByQuery } from '../../../redux/actions/products.action'
import { productApi } from '../../../apis/product.request'
import optionCategory from '../../../data/optionCategory.json'

const themeCustome = {

}

export default function Product() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [dataFilter, setDataFilter] = useState({
        category: "",
        minPrice: "",
        maxPrice: "",
        page: 1,
        limit: 5,
        sort: true,
        inStock: false
    });
    const [moreEdit, setMoreEdit] = useState(null);
    const [callback, setCallback] = useState(false);
    const { isLoading, payload } = useSelector(state => state.productsReducer);

    useEffect(() => {
        dispatch(getProductsByQuery(
            search,
            dataFilter.category,
            dataFilter.minPrice,
            dataFilter.maxPrice,
            dataFilter.page,
            dataFilter.limit,
            dataFilter.sort,
            dataFilter.inStock
        ));
    }, [search, dataFilter, callback]);

    const handleDeleteProduct = async (id) => {
        try {
            const res = await productApi.deleteProduct(id);
            message.success('Xoá sản phẩm thành công');
            setCallback(!callback);
        } catch (error) {
            message.error(error.response.data.message);
        }
    }

    const columns = [
        {
            title: 'Mã sản phẩm',
            dataIndex: 'code',
            key: 'productCode',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Loại',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image.url} alt="Animal" width={50} />,
        },
        {
            title: 'Options',
            key: 'options',
            width: '200px',
            render: (text, record) => <>
                {moreEdit == record.id ?
                    <div className='edit-btn-option'>
                        <Popconfirm
                            title="Xóa sản phẩm"
                            description="Bạn có chắc là muốn xóa sản phẩm này không?"
                            onConfirm={() => handleDeleteProduct(record.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                        <Button onClick={() => navigate(`/admin/manage-product/edit-product/${record.id}`)} icon={<EditOutlined />} />
                        <Button
                            size='small'
                            type='text'
                            onClick={() => setMoreEdit(null)}
                            icon={<CloseOutlined style={{ color: 'var(--color-font-admin)' }} />} />
                    </div> : <Button onClick={() => setMoreEdit(record.id)} icon={<MoreOutlined />} />}
            </>
        },
    ];

    return (
        <ConfigProvider theme={themeCustome}>
            <h1>Quản lý sản phẩm</h1>
            <div className="search" style={{ gap: '20px' }}>
                <Input
                    allowClear
                    className='input-search'
                    size="large"
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm theo tên..."
                    prefix={<SearchOutlined style={{ color: 'var(--color-font-admin)' }} />} />

                <Select
                    allowClear
                    placeholder='Loại sản phảm'
                    style={{
                        width: '11%',
                    }}
                    onChange={(e) => setDataFilter({ ...dataFilter, species: e || "" })}
                    options={optionCategory}
                />

                <InputNumber
                    controls={false}
                    onChange={(e) => setDataFilter({ ...dataFilter, minPrice: e || "" })}
                    suffix="VND"
                    style={{ width: '15%' }}
                    placeholder='Giá thấp nhất'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={(value) => value?.replace(/[^0-9]/g, '')}
                />

                <InputNumber
                    controls={false}
                    onChange={(e) => setDataFilter({ ...dataFilter, maxPrice: e || "" })}
                    suffix="VND"
                    style={{ width: '15%' }}
                    placeholder='Giá cao nhất'
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    parser={(value) => value?.replace(/[^0-9]/g, '')}
                />

                <Select
                    defaultValue={dataFilter.sort}
                    style={{
                        width: '10%',
                    }}
                    onChange={(e) => setDataFilter({ ...dataFilter, sort: e })}
                    options={[
                        {
                            value: true,
                            label: 'Giá tăng dần'
                        },
                        {
                            value: false,
                            label: 'Giá giảm dần'
                        }
                    ]}
                />

                <button className="create" onClick={() => navigate('/admin/manage-product/create-product')}>
                    <PlusOutlined />
                    <span>Thêm sản phẩm mới</span>
                </button>
            </div>

            <div className="table">
                <Table
                    columns={columns}
                    dataSource={payload?.data}
                    loading={isLoading}
                    pagination={{
                        current: payload?.currentPage,
                        pageSize: 5,
                        total: payload?.totalProducts,
                        showQuickJumper: true,
                        onChange: (page, pageSize) => {
                            setDataFilter({
                                ...dataFilter,
                                page: page,
                                limit: pageSize
                            })
                        }
                    }}
                    title={() => (
                        <div>
                            Tổng số sản phẩm: {payload?.totalProducts || 0}
                        </div>
                    )}
                />
            </div>
        </ConfigProvider>
    )
}
