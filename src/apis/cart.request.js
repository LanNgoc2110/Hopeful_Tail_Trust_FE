import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";
const API = Api()
const token = getToken();

export const cartApi = {
    addToCart: (product) => {
        return API.post('/cart/add', product, {
            headers: { authorization: `Bearer ${token}` },
        })
    }
}