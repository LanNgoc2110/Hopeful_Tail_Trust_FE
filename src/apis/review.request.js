import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";

const API = Api()
const token = getToken();

export const reviewApi = {
    getAllReview: (productId) => {
        return API.get(`/review/${productId}`)
    },
    addReview: (data) => {
        return API.post('/review', data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
}