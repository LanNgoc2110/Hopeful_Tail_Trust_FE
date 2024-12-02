import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()

export const invoiceApi = {
    payment: (data) => {
        const token = getToken()
        return API.post(`/invoice`, data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getOrders: () => {
        const token = getToken()
        return API.get(`/invoice`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getOrderByOrderCode: (orderCode) => {
        const token = getToken()
        return API.get(`/invoices/orderCode/${orderCode}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    }
}