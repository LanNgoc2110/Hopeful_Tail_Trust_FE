import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const getAllProducts = () => {
    return API.get('/api/products/all')
}