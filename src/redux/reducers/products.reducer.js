import actionsType from "../actions/action.type";

export const productsReducer = (
    state = { isLoading: false, error: "", payload: null },
    action) => {
    const { type, payload } = action;
    switch (type) {
        case actionsType.PRODUCTS_START:
            return { isLoading: true, error: "", payload: null };
        case actionsType.PRODUCTS_SUCCESS:
            return { isLoading: false, error: "", payload: payload };
        case actionsType.GET_PRODUCT_BY_ID:
            return { isLoading: false, error: "", payload: payload.product };
        case actionsType.PRODUCTS_FAIL:
            return { isLoading: false, error: payload, payload: null };
        default:
            return state;
    }
}