import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()
const token = getToken()

export const invoiceApi = {
    payment: (data) => {
        return API.post(`/invoice`, data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getOrders: (id) => {
        return API.get(`/invoice`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
}