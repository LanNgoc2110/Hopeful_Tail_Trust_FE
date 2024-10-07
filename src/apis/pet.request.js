import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const getAllPets = () => {
    return API.get('/api/pets/all')
}
