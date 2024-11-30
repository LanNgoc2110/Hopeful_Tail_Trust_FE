import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()
const token = getToken()

export const userApi = {
    updateUserProfile: (id, data) => {
        return API.put(`/user/update/${id}`, data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getUserById: (id) => {
        return API.get(`/user/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
}