import { petApi } from "../../apis/pet.request"
import actionsType from "./action.type";

export const getAllPets = () => async (dispatch) => {
    dispatch({ type: actionsType.PETS_START })
    try {
        const response = await petApi.getAllPets()
        dispatch({ type: actionsType.PETS_SUCCESS, payload: response.data });
    } catch (error) {
        // console.log(error);
        dispatch({ type: actionsType.PETS_FAIL, payload: error.response.data });
    }
}

export const getPetById = (id) => async (dispatch) => {
    dispatch({ type: actionsType.PETS_START })
    try {
        const response = await petApi.getPetById(id)
        dispatch({ type: actionsType.GET_PET_BY_ID, payload: response.data });
    } catch (error) {
        // console.log(error);
        dispatch({ type: actionsType.PETS_FAIL, payload: error.response.data });
    }
}
