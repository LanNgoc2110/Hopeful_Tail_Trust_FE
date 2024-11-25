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
}