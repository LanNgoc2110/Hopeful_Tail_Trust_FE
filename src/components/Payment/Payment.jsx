import React, { useEffect, useState } from 'react'
import './Payment.css'
import { useFormik } from 'formik'
import * as Yup from "yup";

const Payment = () => {
  const formik = useFormik({
    initialValues: {
      // lastName: "",
      // firstName: "",
      fullName: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      phone: ""
    },
    validationSchema: Yup.object({
      // lastName: Yup.string().required("* Không được để trống"),
      // firstName: Yup.string().required("* Không được để trống"),
      fullName: Yup.string().required("* Không được để trống"),
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
      phone: Yup.string()
        // .matches(`[^a-zA-Z]+`, "* Chỉ được nhập số")
        .matches(/^\S+$/, "* Số điện thoại không được chứa khoảng trắng")
        .matches(/^\d+$/, "* Chỉ được nhập số")
        .matches(`^[0][1-9]*`, "* Số điện thoại phải bắt đầu bằng số 0")
        .max(10, "* Số điện thoại phải có 10 chữ số")
        .min(10, "* Số điện thoại phải có 10 chữ số")
        .required("* Không được để trống")
    }),

    onSubmit: async (values) => {
      alert("Gửi câu hỏi thành công")
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
    if (formik.values.city !== '0') {
      fetch(`https://esgoo.net/api-tinhthanh/2/${formik.values.city}.htm`)
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
    if (formik.values.district !== '0') {
      fetch(`https://esgoo.net/api-tinhthanh/3/${formik.values.district}.htm`)
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
            name="fullName"
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className='message-error'>{formik.errors.fullName}</p>
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
              <option key={val_city.id} value={val_city.id}>
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
              <option key={val_district.id} value={val_district.id}>
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
              <option key={val_ward.id} value={val_ward.id}>
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
            name="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className='message-error'>{formik.errors.phone}</p>
          )}


        </div>


        <div className="payment-right">
          <p className='title'>Tổng đơn hàng</p>

          <div className="payment-info">
            <div className="payment-info-left">
              <p>Mã đơn hàng</p>
              <p>Sản phẩm</p>
              <p>Phí giao hàng</p>
              <p>Tổng giá</p>
            </div>
            <div className="payment-info-right">
              <p>sadhiuh</p>
              <p>3.000.000 VND</p>
              <p>20.000 VND</p>
              <p>3.020.000 VND</p>
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