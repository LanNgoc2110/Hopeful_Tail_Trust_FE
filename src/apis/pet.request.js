import { Api } from "../utils/BaseUrlServer";
const API = Api()

export const petApi = {
    getAllPets: () => {
        return API.get('/pets/all')
    },
     
    getPetsByQuery: (name, breed, species, age, vaccinated, healthStatus) => {
        return API.get(`/pets/query?name=${name}&breed=${breed}&species=${species}&age=${age}&vaccinated=${vaccinated}&healthStatus=${healthStatus}`)
    }
}