import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const mediaApi = {
    getImageById: (id) => {
        return API.get('/')
    },
}