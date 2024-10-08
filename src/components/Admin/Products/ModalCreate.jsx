import { Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const ModalCreate = ({
  isOpenCreate,
  handleCancelCreate,
  setIsOpenCreate,
  setCallback,
}) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: 0,
      oldPrice: 0,
      image_id: "",
      category: "",
      quantity: 0,
      code: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Tên không được vượt quá 30 ký tự")
        .required("Vui lòng nhập tên sản phẩm"),

      description: Yup.string()
        .max(50, "Mô tả không được vượt quá 50 ký tự")
        .required("Vui lòng nhập mô tả sản phẩm"),

      price: Yup.number()
        .min(0, "Giá không thể nhỏ hơn 0")
        .required("Vui lòng nhập giá sản phẩm"),

      oldPrice: Yup.number()
        .min(0, "Giá cũ không thể nhỏ hơn 0"),

      image_id: Yup.string()
        .required("Vui lòng nhập ID ảnh sản phẩm"),

      category: Yup.string()
        .required("Vui lòng nhập danh mục sản phẩm"),

      quantity: Yup.number()
        .min(0, "Số lượng không thể nhỏ hơn 0")
        .required("Vui lòng nhập số lượng tồn kho"),

      code: Yup.string()
        .max(10, "Mã sản phẩm không được vượt quá 10 ký tự")
        .required("Vui lòng nhập mã sản phẩm")
    }),
    onSubmit: async (values) => {

    },
  });

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   setSelectedFile(file);
  //   setPreviewUrl(URL.createObjectURL(file));
  // };

  return (
    <>
      <Modal
        title="Tạo sản phẩm"
        open={isOpenCreate}
        onOk={formik.handleSubmit}
        onCancel={handleCancelCreate}
      >
        <Input
          placeholder="Tên sản phẩm"
          name="name"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.name}
          </div>
        )}

        <TextArea
          rows={4}
          name="description"
          placeholder="Mô tả sản phẩm"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.errors.description && formik.touched.description && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "5px",
              fontSize: "12px",
            }}
          >
            {formik.errors.description}
          </div>
        )}

        <Input
          placeholder="Giá sản phẩm"
          name="price"
          type="number"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.price}
        />
        {formik.errors.price && formik.touched.price && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.price}
          </div>
        )}

        <Input
          placeholder="Giá cũ"
          name="oldPrice"
          type="number"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.oldPrice}
        />
        {formik.errors.oldPrice && formik.touched.oldPrice && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.oldPrice}
          </div>
        )}

        <Input
          placeholder="Danh mục sản phẩm"
          name="category"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
        />
        {formik.errors.category && formik.touched.category && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.category}
          </div>
        )}

        <Input
          placeholder="Số lượng tồn kho"
          name="quantity"
          type="number"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.quantity}
        />
        {formik.errors.quantity && formik.touched.quantity && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.quantity}
          </div>
        )}

        <Input
          placeholder="Mã sản phẩm"
          name="code"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.code}
        />
        {formik.errors.code && formik.touched.code && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.code}
          </div>
        )}

        <input
          id="imageThemeId"
          type="file"
          // onChange={handleFileChange}
          hidden
        />
        <label htmlFor="imageThemeId">
          <div className="choose-image">
            {previewUrl ? (
              <img
                src={previewUrl}
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <span style={{ cursor: "pointer" }}>
                Chọn ảnh dưới dạng: jpg, jpeg, png
              </span>
            )}
          </div>
        </label>
      </Modal>
    </>
  );
};
export default ModalCreate;
