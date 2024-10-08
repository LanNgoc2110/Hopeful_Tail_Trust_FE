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
      sex: "",
      age: null,
      species: "",
      breed: "",
      vaccinated: null,
      healthStatus: "",
      image_id: ""
    },
    validationSchema: Yup.object({
      key: Yup.string().required("Key is required"),
      name: Yup.string().required("Name is required"),
      sex: Yup.string().oneOf(["Male", "Female"], "Sex must be Male or Female").required("Sex is required"),
      age: Yup.number().min(0, "Age must be a positive number").required("Age is required"),
      species: Yup.string().required("Species is required"),
      breed: Yup.string().required("Breed is required"),
      vaccinated: Yup.boolean().required("Vaccinated status is required"),
      healthStatus: Yup.string().required("Health Status is required"),
      image_id: Yup.string().required("Image ID is required"),
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
          placeholder="Key"
          name="key"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.key}
        />
        {formik.errors.key && formik.touched.key && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.key}
          </div>
        )}

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

        <select
          name="sex"
          style={{ marginBottom: "15px", width: "100%" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sex}
        >
          <option value="">Chọn giới tính</option>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
        {formik.errors.sex && formik.touched.sex && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.sex}
          </div>
        )}

        <Input
          placeholder="Tuổi"
          name="age"
          type="number"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
        />
        {formik.errors.age && formik.touched.age && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.age}
          </div>
        )}

        <Input
          placeholder="Loài"
          name="species"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.species}
        />
        {formik.errors.species && formik.touched.species && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.species}
          </div>
        )}

        <Input
          placeholder="Giống"
          name="breed"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.breed}
        />
        {formik.errors.breed && formik.touched.breed && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.breed}
          </div>
        )}

        <select
          name="vaccinated"
          style={{ marginBottom: "15px", width: "100%" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.vaccinated}
        >
          <option value="">Đã tiêm phòng?</option>
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>
        {formik.errors.vaccinated && formik.touched.vaccinated && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.vaccinated}
          </div>
        )}

        <Input
          placeholder="Tình trạng sức khỏe"
          name="healthStatus"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.healthStatus}
        />
        {formik.errors.healthStatus && formik.touched.healthStatus && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.healthStatus}
          </div>
        )}

        <Input
          placeholder="ID hình ảnh"
          name="image_id"
          style={{ marginBottom: "15px" }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image_id}
        />
        {formik.errors.image_id && formik.touched.image_id && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              marginTop: "-10px",
              fontSize: "12px",
            }}
          >
            {formik.errors.image_id}
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
