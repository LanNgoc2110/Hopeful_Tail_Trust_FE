import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";

const API = Api()

export const fundApi = {
    addFund: (amount) => {
        const token = getToken();
        return API.post('/fund', amount, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getAllFunds: () => {
        const token = getToken();
        return API.get('/fund', {
            headers: { authorization: `Bearer ${token}` },
        })
    }
}