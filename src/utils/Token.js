import { message } from "antd";
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token;
};

export const getUserFromToken = () => {
  const token = getToken();

  if (!token) {
    message.error("Token không tồn tại. Vui lòng đăng nhập lại.");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTime) {
      message.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      localStorage.removeItem("token");
      return null;
    }

    return decodedToken;
  } catch (error) {
    message.error("Token không hợp lệ. Vui lòng đăng nhập lại.");
    localStorage.removeItem("token");
    return null;
  }
};