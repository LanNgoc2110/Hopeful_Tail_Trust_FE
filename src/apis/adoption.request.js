import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";

const API = Api()

export const adoptionApi = {
    createAdoption: (data) => {
        const token = getToken();
        return API.post('/request/adoption-request', data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },

    getAllAdoption: () => {
        const token = getToken();
        return API.get('/request/adoption-request', {
            headers: { authorization: `Bearer ${token}` },
        })
    },

    getAdoptionById: (id) => {
        const token = getToken();
        return API.get(`/request/adoption-request/${id}`, {
            headers: { authorization: `Bearer ${token}` },
        })
    },

    updateAdoption: (data) => {
        const token = getToken();
        return API.patch(`/request/adoption-request`, data, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
}