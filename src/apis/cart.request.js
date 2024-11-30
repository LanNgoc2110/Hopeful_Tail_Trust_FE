import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()


export const cartApi = {
    addToCart: (product) => {
        const token = getToken();
        return API.post('/cart/add', product, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getAllCart: (category) => {
        const token = getToken();
        return API.get(`/cart/all?category=${category}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getCartById: (id) => {
        const token = getToken();
        return API.get(`/cart/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    updateCart: (data) => {
        const token = getToken();
        return API.put('/cart/update', data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    deleteCart: (id) => {
        const token = getToken();
        return API.delete(`/cart/delete/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    }
}