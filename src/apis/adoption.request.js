import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";

const API = Api()
const token = getToken();

export const adoptionApi = {
    createAdoption: (data) => {
        return API.post('/request/adoption-request', data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },

    getAllAdoption: () => {
        return API.get('/request/adoption-request', {
            headers: { authorization: `Bearer ${token}` },
        })
    },

    getAdoptionById: (id) => {
        return API.get(`/request/adoption-request/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },

    updateAdoption: (data) => {
        return API.patch(`/request/adoption-request`, data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
}