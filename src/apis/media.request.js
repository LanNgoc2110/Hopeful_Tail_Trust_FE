import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const mediaApi = {
    uploadImage: (data) => {
        return API.post('/media', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    deleteImage: (id) => {
        return API.delete(`/media/${id}`)
    }
}