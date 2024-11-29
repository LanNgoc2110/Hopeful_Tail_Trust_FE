import {
    PlusOutlined,
    SearchOutlined,
    MoreOutlined,
    DeleteOutlined,
    EditOutlined,
    CloseOutlined,
    EyeOutlined
} from '@ant-design/icons'
import { Button, ConfigProvider, Input, message, Popconfirm, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import '../AdminTheme.css'
import { useDispatch, useSelector } from 'react-redux'
import { getPetByQuery } from '../../../redux/actions/pets.action'
import { useNavigate } from 'react-router-dom'
import optionSpecies from '../../../data/optionSpecies.json'
import optionSex from '../../../data/optionSex.json'
import optrionVaccinated from '../../../data/optionVaccinated.json'
import { petApi } from '../../../apis/pet.request'

const themeCustome = {

}

export default function Pet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [dataFilter, setDataFilter] = useState({
        breed: "",
        coatColor: "",
        sex: "",
        species: "",
        vaccinated: "",
        page: 1,
        limit: 5
    });
    const [moreEdit, setMoreEdit] = useState(null);
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [callback, setCallback] = useState(false);
    const { isLoading, error, payload } = useSelector(state => state.petsReducer);

    const handleDeletePet = async (id) => {
        try {
            const res = await petApi.deletePet(id);
            message.success('Xoá thú cưng thành công');
            setCallback(!callback);
        } catch (error) {
            message.error(error.response.data.message);
        }
    }

    useEffect(() => {
        dispatch(getPetByQuery(
            search,
            dataFilter.breed,
            dataFilter.coatColor,
            dataFilter.sex,
            dataFilter.species,
            dataFilter.vaccinated,
            dataFilter.page,
            dataFilter.limit
        ));
    }, [search, dataFilter, callback]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'pet_name',
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
        },
        {
            title: 'Breed',
            dataIndex: 'breed',
            key: 'breed',
        },
        {
            title: 'Vaccinated',
            dataIndex: 'vaccinated',
            key: 'vaccinated',
        },
        {
            title: 'Health Status',
            dataIndex: 'healthStatus',
            key: 'healthStatus',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image.url} alt="Animal" width={50} />,
        },
        {
            title: 'Options',
            key: 'pet_options',
            width: '200px',
            render: (text, record) => <>
                {moreEdit == record._id ?
                    <div className='edit-btn-option'>
                        <Popconfirm
                            title="Xóa thú cưng"
                            description="Bạn có chắc là muốn xóa thú cưng này không?"
                            onConfirm={() => handleDeletePet(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger icon={<DeleteOutlined />} />
                        </Popconfirm>
                        <Button onClick={() => navigate(`/admin/manage-pet/edit-pet/${record._id}`)} icon={<EditOutlined />} />
                        <Button
                            size='small'
                            type='text'
                            onClick={() => setMoreEdit(null)}
                            icon={<CloseOutlined style={{ color: 'var(--color-font-admin)' }} />} />
                    </div> : <Button onClick={() => setMoreEdit(record._id)} icon={<MoreOutlined />} />}
            </>
        },
    ];

    const showModalCreate = () => {
        // setIsOpenCreate(true);
        navigate('/admin/manage-pet/create-pet');
    };
    const handleCancelFilter = () => {
        setIsOpenFilter(false);
    };

    const handleChangeSize = (current, size) => {
        setDataFilter({
            ...dataFilter,
            page: current,
            limit: size
        })
        // console.log(current, size);
    }

    return (
        <ConfigProvider theme={themeCustome}>
            <h1>Quản lý thú cưng</h1>
            <div className="search" style={{ gap: '20px' }}>
                <Input
                    allowClear
                    onChange={(e) => setSearch(e.target.value)}
                    className='input-search'
                    size="large"
                    placeholder="Tìm kiếm theo tên..."
                    prefix={<SearchOutlined style={{ color: 'var(--color-font-admin)' }} />} />
                {/* <button
                    className="btn-filter"
                    onClick={() => setIsOpenFilter(true)}
                >
                    <FilterOutlined />
                    <span>Filter</span>
                </button> */}
                <button className="create" onClick={showModalCreate} >
                    <PlusOutlined />
                    <span>Thêm thú cứng mới</span>
                </button>
                <Input
                    allowClear
                    onChange={(e) => setDataFilter({ ...dataFilter, breed: e.target.value })}
                    className='input-search'
                    size="large"
                    placeholder="Giống"
                    style={{ width: '10%' }}
                />
                <Select
                    allowClear
                    placeholder='Loài'
                    style={{
                        width: '10%',
                    }}
                    onChange={(e) => setDataFilter({ ...dataFilter, species: e || "" })}
                    options={optionSpecies}
                />
                <Select
                    allowClear
                    placeholder='Giới tính'
                    style={{
                        width: '10%',
                    }}
                    onChange={(e) => setDataFilter({ ...dataFilter, sex: e || "" })}
                    options={optionSex}
                />
                <Select
                    allowClear
                    placeholder='Tiêm ngừa'
                    style={{
                        width: '10%',
                    }}
                    onChange={(e) => setDataFilter({ ...dataFilter, vaccinated: e || "" })}
                    options={optrionVaccinated}
                />
                <Input
                    allowClear
                    onChange={(e) => setDataFilter({ ...dataFilter, coatColor: e.target.value })}
                    className='input-search'
                    size="large"
                    placeholder="Màu lông"
                    style={{ width: '10%' }}
                />
            </div>

            <div className="table">
                <Table
                    columns={columns}
                    dataSource={payload?.data}
                    loading={isLoading}
                    pagination={{
                        current: payload?.currentPage,
                        pageSize: 5,
                        total: payload?.totalPets,
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
                            Tổng số Pets: {payload?.totalPets || 0} {/* Hiển thị tổng số Pets */}
                        </div>
                    )}
                />
            </div>
        </ConfigProvider>
    )
}
