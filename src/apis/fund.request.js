import { Api } from "../utils/BaseUrlServer";
import { getToken } from "../utils/Token";

const API = Api()
const token = getToken();

export const fundApi = {
    addFund: (amount) => {
        return API.post('/fund', amount, {
            headers: { authorization: `Bearer ${token}` },
        })
    },
    getAllFunds: () => {
        return API.get('/fund')
    }
}