import { message } from "antd";
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
};

export const getUserFromToken = () => {
  const token = getToken();

  if (!token) {
    return {message: "Vui lòng đăng nhập trước khi truy cập.", user: null}; 
  }

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return {message: "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.", user: null}; 
    }

    return {message: "Decode thành công", user: decodedToken}; 
  } catch (error) {
    localStorage.removeItem("token");
    return {message: "Token không hợp lệ. Vui lòng đăng nhập lại.", user: null}; 
  }
};