import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";

const API = Api()

export const reviewApi = {
    getAllReview: (productId) => {
        return API.get(`/review/${productId}`)
    },
    addReview: (data) => {
        const token = getToken();
        return API.post('/review', data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
}