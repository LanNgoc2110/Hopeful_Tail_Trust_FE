import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const mediaApi = {
    uploadImage: (data) => {
        return API.post('/media', data)
    },
    deleteImage: (id) => {
        return API.delete(`/media/${id}`)
    }
}