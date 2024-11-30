import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()
const token = getToken();

export const productApi = {
    getAllProducts: () => {
        return API.get('/products/all')
    },

    getProductById: (id) => {
        return API.get(`/products/${id}`)
    },

    getProductsByQuery: (name, category, minPrice, maxPrice, page, limit, sort, inStock) => {
        return API.get(`/products?name=${name}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}&sort=${sort}&inStock=${inStock}`)
    },

    addProduct: (data) => {
        return API.post('/products/add', data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
    },

    updateProduct: (id, data) => {
        return API.put(`/products/update/${id}`, data)
    },

    deleteProduct: (id) => {
        return API.delete(`/products/delete/${id}`)
    },
}