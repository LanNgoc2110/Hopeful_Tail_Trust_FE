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

export default function Pet() {
    const [moreEdit, setMoreEdit] = useState(null);
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [callback, setCallback] = useState(false);

    const dataPets = [
        {
          key: '1',
          name: "Fluffy",
          sex: "Female",
          age: 2,
          species: "Cat",
          breed: "Labrador",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id"
        },
        {
          key: '2',
          name: "Max",
          sex: "Male",
          age: 3,
          species: "Dog",
          breed: "Beagle",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id2"
        },
        {
          key: '3',
          name: "Bella",
          sex: "Female",
          age: 1,
          species: "Cat",
          breed: "Siamese",
          vaccinated: false,
          healthStatus: "Slightly injured",
          image_id: "sample_image_id3"
        },
        {
          key: '4',
          name: "Charlie",
          sex: "Male",
          age: 4,
          species: "Dog",
          breed: "Poodle",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id4"
        },
        {
          key: '5',
          name: "Daisy",
          sex: "Female",
          age: 2,
          species: "Rabbit",
          breed: "Dutch",
          vaccinated: false,
          healthStatus: "Healthy",
          image_id: "sample_image_id5"
        },
        {
          key: '6',
          name: "Oscar",
          sex: "Male",
          age: 5,
          species: "Cat",
          breed: "Persian",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id6"
        },
        {
          key: '7',
          name: "Milo",
          sex: "Male",
          age: 1,
          species: "Dog",
          breed: "Golden Retriever",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id7"
        },
        {
          key: '8',
          name: "Luna",
          sex: "Female",
          age: 2,
          species: "Cat",
          breed: "Maine Coon",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id8"
        },
        {
          key: '9',
          name: "Buddy",
          sex: "Male",
          age: 3,
          species: "Dog",
          breed: "Bulldog",
          vaccinated: false,
          healthStatus: "Injured",
          image_id: "sample_image_id9"
        },
        {
          key: '10',
          name: "Coco",
          sex: "Female",
          age: 2,
          species: "Cat",
          breed: "Russian Blue",
          vaccinated: true,
          healthStatus: "Healthy",
          image_id: "sample_image_id10"
        }
      ];
      

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
            render: (vaccinated) => (vaccinated ? 'Yes' : 'No'),
        },
        {
            title: 'Health Status',
            dataIndex: 'healthStatus',
            key: 'healthStatus',
        },
        {
            title: 'Image',
            dataIndex: 'image_id',
            key: 'image_id',
            render: (image_id) => <img src={"https://cdn-media.sforum.vn/storage/app/media/THANHAN/avatar-trang-98.jpg"} alt="Animal" width={50} />,
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
            <h1>Quản lý thú cưng</h1>
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
                    <span>Thêm thú cứng mới</span>
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
                    dataSource={dataPets}
                    pagination={{
                        pageSize: 10,
                    }}
                />
            </div>
        </ConfigProvider>
    )
}
