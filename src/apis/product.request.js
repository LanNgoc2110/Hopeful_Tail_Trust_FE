import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const productApi = {
    getAllProducts: () => {
        return API.get('/products/all')
    },

    getProductById: (id) => {
        return API.get(`/products/${id}`)
    },
}