import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()
const token = getToken();

export const cartApi = {
    addToCart: (product) => {
        return API.post('/cart/add', product, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getAllCart: (category) => {
        return API.get(`/cart/all?category=${category}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getCartById: (id) => {
        return API.get(`/cart/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        })  
    },
    updateCart: () => {
        return API.put('/cart/update', {}, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    deleteCart: () => {
        return API.delete('/cart/delete', {
            headers: { authorization: `Bearer ${token}` },
        })
    }
}