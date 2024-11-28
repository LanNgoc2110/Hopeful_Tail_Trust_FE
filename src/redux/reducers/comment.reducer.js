import actionsType from "../actions/action.type";

export const commentReducer = (
    state = { isLoading: false, error: "", payload: [] },
    action) => {
    const { type, payload } = action;
    switch (type) {
        case actionsType.COMMENT_START:
            return { isLoading: true, error: "", payload: [] };
        case actionsType.COMMENT_SUCCESS:
            return { isLoading: false, error: "", payload: payload };
        case actionsType.GET_COMMENT_SUCCESS:
            return { isLoading: false, error: "", payload: payload.data };
        case actionsType.COMMENT_FAIL:
            return { isLoading: false, error: payload, payload: [] };
        default:
            return state;
    }
}