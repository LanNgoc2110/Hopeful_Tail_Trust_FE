import { productApi } from "../../apis/product.request"
import actionsType from "./action.type";

export const getAllProducts = () => async (dispatch) => {
    dispatch({ type: actionsType.PRODUCTS_START })
    try {
        const response = await productApi.getAllProducts()
        dispatch({ type: actionsType.PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        // console.log(error);
        dispatch({ type: actionsType.PRODUCTS_FAIL, payload: error.response.data });
    }
}

export const getProductById = (id) => async (dispatch) => {
    dispatch({ type: actionsType.PRODUCTS_START })
    try {
        const response = await productApi.getProductById(id)
        dispatch({ type: actionsType.GET_PRODUCT_BY_ID, payload: response.data });
    } catch (error) {
        // console.log(error);
        dispatch({ type: actionsType.PRODUCTS_FAIL, payload: error.response.data });
    }
}
