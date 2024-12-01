import React, { useEffect, useState } from 'react'
import {
  LoadingOutlined,
  InboxOutlined,
  ProductOutlined
} from '@ant-design/icons'
import { Breadcrumb, Button, Input, InputNumber, message, Select, Upload } from 'antd'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Product.css'
import optionCategory from '../../../data/optionCategory.json'
import { mediaApi } from '../../../apis/media.request'
import { productApi } from '../../../apis/product.request'

const { TextArea } = Input
const { Dragger } = Upload;

export default function EditProduct() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null);
  const [product, setProduct] = React.useState(null)

  const id = useParams().id;

  useEffect(() => {
    // Gọi API để lấy dữ liệu pet theo ID
    const fetchProduct = async () => {
      try {
        const res = await productApi.getProductById(id);
        // console.log(res.data.data);

        setProduct({
          name: res.data.data.name,
          description: res.data.data.description,
          price: res.data.data.price,
          oldPrice: res.data.data.oldPrice,
          image_id: res.data.data.image.url,
          category: res.data.data.category,
          quantity: res.data.data.quantity,
          code: res.data.data.code,
          supportPercentage: res.data.data.supportPercentage
        });
        setImage(res.data.data.image.url);
      } catch (error) {
        message.error('Không thể lấy thông tin sản phẩm.');
        console.log(error);

      }
    };
    fetchProduct();
  }, [id]);

  const props = {
    name: 'file',
    multiple: false,
    customRequest: async (options) => {
      const { file, onSuccess, onError } = options;
      const formData = new FormData(); // Tạo FormData để gửi dữ liệu file
      formData.append('files', file);

      try {
        const response = await mediaApi.uploadImage(formData); // Gọi API upload
        // console.log(response.data);
        setImage(response.data.url)
        setProduct({ ...product, image_id: response.data.id })
        message.success(`${file.name} file uploaded successfully.`);
        onSuccess(response.data); // Gọi callback thành công của Ant Design
      } catch (error) {
        onError(error); // Gọi callback thất bại của Ant Design
        message.error(`${file.name} file upload failed.`);
      }
    },
    onChange(info) {
      const { status } = info.file;
      if (status === 'uploading') {
        console.log('Uploading file...');
      }
      if (status === 'done') {
        console.log('File upload successful');
      } else if (status === 'error') {
        console.error('File upload failed:', info.file);
      }
    },
    async onRemove(file) {
      try {
        const response = await mediaApi.deleteImage(product.image_id); // Gọi API upload
        // console.log(response.data);
        setImage(null)
        setProduct({ ...product, image_id: "" })
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }

  };

  const handleAddProduct = async () => {
    setIsLoading(true)
    try {
      // console.log(product);

      const res = await productApi.updateProduct(id, product)
      message.success('Cập nhật sản phẩm thành công');
      navigate('/admin/manage-product')
      setIsLoading(false)
    } catch (error) {
      message.error(error.response.data.message);
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '1% 2%' }}>
      <div className="back-to-product-list">
        <Breadcrumb
          items={[
            { title: <Link to="/admin/manage-product"><ProductOutlined /> Danh sách sản phẩm</Link> },
            { title: "Tạo mới sản phẩm" }
          ]}
        />
      </div>

      <div className='create-product-container'>
        <h1 style={{ width: '100%' }}>Cập nhật sản phẩm</h1>
        <div className='create-product-left-container'>
          <Dragger {...props}>
            {!image ? (
              <>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Nhấp chuột hoặc kéo thả file ảnh tại đây</p>
                <p className="ant-upload-hint">
                  Hỗ trợ tải lên một lần. Nghiêm cấm tải lên dữ liệu công ty hoặc các tệp bị cấm khác.
                </p>
              </>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <img src={image} style={{ width: '100%' }} />
              </div>
            )}
          </Dragger>
        </div>
        <div className='create-product-right-container'>
          <Input
            value={product?.name}
            className='product-info'
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            style={{ width: '100%', height: '38px' }}
            size="large"
            placeholder="Tên"
          />
          <div className='product-info'>
            <Input
              value={product?.code}
              onChange={(e) => setProduct({ ...product, code: e.target.value })}
              style={{ width: '48%' }}
              size="large"
              placeholder="Mã sản phẩm"
            />
            <InputNumber
              value={product?.supportPercentage}
              controls={false}
              onChange={(e) => setProduct({ ...product, supportPercentage: e || 5 })}
              style={{ width: '48%' }}
              min={5}
              size="large"
              suffix="%"
              placeholder="Phần trăm hỗ trợ (ít nhất 5%)"
            />
          </div>
          <div className='product-info'>
            <InputNumber
              value={product?.price}
              controls={false}
              onChange={(e) => setProduct({ ...product, price: e || 0 })}
              suffix="VND"
              style={{ width: '100%' }}
              placeholder='Giá gốc'
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => value?.replace(/[^0-9]/g, '')}
            />

            {/* <InputNumber
              value={product?.oldPrice}
              controls={false}
              onChange={(e) => setProduct({ ...product, oldPrice: e || 0 })}
              suffix="VND"
              style={{ width: '48%' }}
              placeholder='Giá'
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={(value) => value?.replace(/[^0-9]/g, '')}
            /> */}
          </div>
          <div className='product-info'>
            <Select
              value={product?.category}
              style={{ width: '48%' }}
              size='large'
              placeholder='Loại'
              onChange={(e) => setProduct({ ...product, category: e || "" })}
              options={optionCategory}
            />
            <InputNumber
              value={product?.quantity}
              controls={false}
              onChange={(e) => setProduct({ ...product, quantity: e || 0 })}
              style={{ width: '48%' }}
              placeholder='Số lượng'
            />
          </div>
          <TextArea
            value={product?.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            size="large"
            placeholder="Miêu tả"
          />
        </div>
        <div className='create-product-btn'>
          {/* <button>Cập nhật thú cưng</button> */}
          <Button
            disabled={isLoading}
            onClick={() => handleAddProduct()}
            type="primary"
            size='large'>{isLoading && <LoadingOutlined style={{ marginRight: '10px' }} />} Cập nhật sản phẩm</Button>
        </div>
      </div>
    </div>
  )
}
