import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { invoiceApi } from '../../apis/invoice.request';
import { message } from 'antd';

const Payment = () => {
  const cart = JSON.parse(localStorage.getItem('checkoutProducts'))
  const [messageApi, contextHolder] = message.useMessage();

  const formik = useFormik({
    initialValues: {
      lastName: "",
      // firstName: "",
      // fullName: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      phoneNumber: ""
    },
    validationSchema: Yup.object({
      lastName: Yup.string()
        .matches(
          /^[^0-9]*$/,
          "* Họ tên không được nhập số"
        )
        .matches(
          /^[^!@#$%^&*(),.?":{}|<>]*$/,
          "* Họ tên không được chứa ký tự đặc biệt"
        )
        .matches(
          /^[A-ZÀ-Ỹ][a-zà-ỹ]*(\s[A-ZÀ-Ỹ][a-zà-ỹ]*)*$/,
          "* Mỗi từ phải viết hoa chữ cái đầu"
        )
        .required("* Không được để trống"),
      // firstName: Yup.string().required("* Không được để trống"),
      // fullName: Yup.string().required("* Không được để trống"),
      street: Yup.string().required("* Không được để trống"),
      city: Yup.string()
        .notOneOf(["0"], "* Bắt buộc phải chọn Tỉnh/Thành phố")
        .required("* Không được để trống"),
      district: Yup.string()
        .notOneOf(["0"], "* Bắt buộc phải chọn Quận/Huyện")
        .required("* Không được để trống"),
      ward: Yup.string()
        .notOneOf(["0"], "* Bắt buộc phải chọn Phường/Xã")
        .required("* Không được để trống"),
      phoneNumber: Yup.string()
        // .matches(`[^a-zA-Z]+`, "* Chỉ được nhập số")
        .matches(/^\S+$/, "* Số điện thoại không được chứa khoảng trắng")
        .matches(/^\d+$/, "* Chỉ được nhập số")
        .matches(`^[0][1-9]*`, "* Số điện thoại phải bắt đầu bằng số 0")
        .max(10, "* Số điện thoại phải có 10 chữ số")
        .min(10, "* Số điện thoại phải có 10 chữ số")
        .required("* Không được để trống")
    }),

    onSubmit: async (values) => {
      // console.log(values);
      messageApi.loading("Xin đợi trong giây lát");
      try {
        const data = {
          ...values,
          amount: 0,
          totalAmount: cart.totalAmount,
          cartItemIds: cart.cartItems
        };
        // console.log(data);

        const response = await invoiceApi.payment(data);
        messageApi.destroy();
        window.location.href = response.data.checkoutUrl

      } catch (error) {
        messageApi.destroy();
        console.log(error);
        message.error(error.response.data.message);
      }
    }
  })

  // link trang để lấy api Tỉnh Thành, Quận Huyện, Phường Xã
  // https://esgoo.net/api-lay-thong-tin-tinh-thanh-quan-huyen-phuong-xa-viet-nam-bv5.htm

  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  // const [selectedCity, setSelectedCity] = useState('0');
  // const [selectedDistrict, setSelectedDistrict] = useState('0');
  // const [selectedWard, setSelectedWard] = useState('0');

  useEffect(() => {
    // Fetching the list of Cities (Tỉnh Thành)
    fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then((response) => response.json())
      .then((cityData) => {
        if (cityData.error === 0) {
          setCityList(cityData.data);
          // console.log(cityData.data);

        }
      });
  }, []);


  // trước khi dùng formik
  // useEffect(() => {
  //   if (selectedCity !== '0') {
  //     // Fetching the list of Districts (Quận Huyện) when a City is selected
  //     fetch(`https://esgoo.net/api-tinhthanh/2/${selectedCity}.htm`)
  //       .then((response) => response.json())
  //       .then((districtData) => {
  //         if (districtData.error === 0) {
  //           setDistrictList(districtData.data);
  //           setWardList([]); // Reset Wards when District changes
  //           setSelectedDistrict('0');
  //         }
  //       });
  //   }
  // }, [selectedCity]);

  // useEffect(() => {
  //   if (selectedDistrict !== '0') {
  //     // Fetching the list of Wards (Phường Xã) when a District is selected
  //     fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`)
  //       .then((response) => response.json())
  //       .then((wardData) => {
  //         if (wardData.error === 0) {
  //           setWardList(wardData.data);
  //         }
  //       });
  //   }
  // }, [selectedDistrict]);

  // sau khi dùng formik 
  useEffect(() => {
    //phần đã cmt là tìm theo id
    // if (formik.values.city !== '0') {
    //   fetch(`https://esgoo.net/api-tinhthanh/2/${formik.values.city}.htm`)
    //     .then((response) => response.json())
    //     .then((districtData) => {
    //       if (districtData.error === 0) {
    //         setDistrictList(districtData.data);
    //         console.log(districtData.data);

    //         setWardList([]);
    //         formik.setFieldValue('district', '0'); // Reset District
    //         formik.setFieldValue('ward', '0');    // Reset Ward
    //       }
    //     });
    // }
    const selectedCity = cityList.find(city => city.full_name === formik.values.city);
    if (selectedCity) {
      fetch(`https://esgoo.net/api-tinhthanh/2/${selectedCity.id}.htm`)
        .then((response) => response.json())
        .then((districtData) => {
          if (districtData.error === 0) {
            setDistrictList(districtData.data);
            setWardList([]);
            formik.setFieldValue('district', '0'); // Reset District
            formik.setFieldValue('ward', '0');    // Reset Ward
          }
        });
    }
  }, [formik.values.city]);

  useEffect(() => {
    const selectedDistrict = districtList.find(district => district.full_name === formik.values.district);
    if (selectedDistrict) {
      fetch(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`)
        .then((response) => response.json())
        .then((wardData) => {
          if (wardData.error === 0) {
            setWardList(wardData.data);
            formik.setFieldValue('ward', '0'); // Reset Ward
          }
        });
    }
  }, [formik.values.district]);

  return (
    <div>
      <form className='payment-container' onSubmit={formik.handleSubmit}>
        <div className="payment-left">
          <p className='title'>Thanh toán</p>
          <p className='sub-title'>Địa chỉ giao hàng</p>

          {/* <div className="two-input-field">
            <div className="input-left">
              <input
                placeholder='Họ'
                name="lastName"
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.lastName && formik.touched.lastName && (
                <p className='message-error'>{formik.errors.lastName}</p>
              )}
            </div>
            <div className="input-right">
              <input
                placeholder='Tên'
                name="firstName"
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.firstName && formik.touched.firstName && (
                <p className='message-error'>{formik.errors.firstName}</p>
              )}
            </div>
          </div> */}

          <input
            placeholder='Họ Tên'
            name="lastName"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName && (
            <p className='message-error'>{formik.errors.lastName}</p>
          )}

          <select
            // className={`${ selectedCity !== '0' ? 'selected' : ''}`}
            className={`${formik.values.city && formik.values.city !== '0' ? 'selected' : ''}`}
            id="city"
            name="city"
            title="Chọn Tỉnh Thành"
            // value={selectedCity}
            // onChange={(e) => {
            //   setSelectedCity(e.target.value);
            //   setSelectedWard('0'); // Reset Ward to default
            // }}
            value={formik.values.city}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {/* {selectedCity === '0' && <option value="0">Chọn Tỉnh/Thành</option>} */}
            <option value="0">Chọn Tỉnh/Thành</option>
            {cityList.map((val_city) => (
              <option key={val_city.id} value={val_city.full_name}>
                {val_city.full_name}
              </option>
            ))}
          </select>
          {formik.errors.city && formik.touched.city && (
            <p className='message-error'>{formik.errors.city}</p>
          )}

          <select
            // className={`${ selectedDistrict !== '0' ? 'selected' : ''}`}
            className={`${formik.values.district && formik.values.district !== '0' ? 'selected' : ''}`}
            id="district"
            name="district"
            title="Chọn Quận Huyện"
            // value={selectedDistrict}
            // onChange={(e) => {
            //   setSelectedDistrict(e.target.value);
            //   setSelectedWard('0'); // Reset Ward to default
            // }}
            value={formik.values.district}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {/* {selectedDistrict === '0' && <option value="0">Chọn Quận/Huyện</option>} */}
            <option value="0">Chọn Quận/Huyện</option>
            {districtList.map((val_district) => (
              <option key={val_district.id} value={val_district.full_name}>
                {val_district.full_name}
              </option>
            ))}
          </select>
          {formik.errors.district && formik.touched.district && (
            <p className='message-error'>{formik.errors.district}</p>
          )}

          <select
            // className={`${ selectedWard !== '0' ? 'selected' : ''}`}
            className={`${formik.values.ward && formik.values.ward !== '0' ? 'selected' : ''}`}
            id="ward"
            name="ward"
            title="Chọn Phường Xã"
            // value={selectedWard}
            // onChange={(e) => setSelectedWard(e.target.value)}
            value={formik.values.ward}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          >
            {/* {selectedWard === '0' && <option value="0">Chọn Phường/Xã</option>} */}
            <option value="0">Chọn Phường/Xã</option>
            {wardList.map((val_ward) => (
              <option key={val_ward.id} value={val_ward.full_name}>
                {val_ward.full_name}
              </option>
            ))}
          </select>
          {formik.errors.ward && formik.touched.ward && (
            <p className='message-error'>{formik.errors.ward}</p>
          )}

          <input
            placeholder='Số nhà, Đường'
            name="street"
            value={formik.values.street}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.street && formik.touched.street && (
            <p className='message-error'>{formik.errors.street}</p>
          )}

          <input
            placeholder='Số diện thoại'
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <p className='message-error'>{formik.errors.phoneNumber}</p>
          )}


        </div>


        <div className="payment-right">
          <p className='title'>Tổng đơn hàng</p>

          <div className="payment-info">
            <div className="payment-info-left">
              {/* <p>Mã đơn hàng</p> */}
              <p>Sản phẩm</p>
              {/* <p>Phí giao hàng</p> */}
              <p>Tổng giá</p>
            </div>
            <div className="payment-info-right">
              {/* <p>sadhiuh</p> */}
              <p>{cart.totalAmount.toLocaleString('vi-VN')} VND</p>
              {/* <p>20.000 VND</p> */}
              <p>{cart.totalAmount.toLocaleString('vi-VN')} VND</p>
            </div>
          </div>

          <div className="payment-btn">
            <button type='submit'>Thanh toán</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default Payment