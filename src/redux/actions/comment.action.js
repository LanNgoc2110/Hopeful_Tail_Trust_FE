
import { reviewApi } from "../../apis/review.request";
import actionsType from "./action.type";

export const getAllReview = (productId) => async (dispatch) => {
    dispatch({ type: actionsType.COMMENT_START })
    try {
        const response = await reviewApi.getAllReview(productId);
        dispatch({ type: actionsType.GET_COMMENT_SUCCESS, payload: response.data });
    } catch (error) {
        // console.log(error);
        dispatch({ type: actionsType.COMMENT_FAIL, payload: error.response.data });
    }
}

export const addNewReview = (comment) => async (dispatch) => {
    dispatch({ type: actionsType.COMMENT_START })
    try {
        const response = await reviewApi.addReview(comment);
        dispatch({ type: actionsType.COMMENT_SUCCESS, payload: response.data });
    } catch (error) {
        // console.log(error);
        dispatch({ type: actionsType.COMMENT_FAIL, payload: error.response.data });
    }
}
