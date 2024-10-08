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
      name: '',
      date: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên là bắt buộc'),
      date: Yup.date().required('Ngày là bắt buộc').nullable(),
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
        title="Tạo bài viết"
        open={isOpenCreate}
        onOk={formik.handleSubmit}
        onCancel={handleCancelCreate}
      >
        <Input
          placeholder="Tên"
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

        <Input
          placeholder="Ngày (YYYY-MM-DD)"
          name="date"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {formik.errors.date && formik.touched.date && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.date}
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
