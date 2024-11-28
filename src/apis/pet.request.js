import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const petApi = {
    getAllPets: () => {
        return API.get('/pets/all')
    },
     
    getPetsByQuery: (name, breed, coatColor, sex, species, vaccinated, page, limit) => {
        return API.get(`/pets/query?name=${name}&breed=${breed}&coatColor=${coatColor}&sex=${sex}&species=${species}&vaccinated=${vaccinated}&page=${page}&limit=${limit}`)
    },

    getPetById: (id) => {
        return API.get(`/pets/${id}`)
    },
}