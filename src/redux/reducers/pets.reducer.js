import actionsType from "../actions/action.type";

export const petsReducer = (
    state = { isLoading: false, error: "", payload: null },
    action) => {
    const { type, payload } = action;
    switch (type) {
        case actionsType.PETS_START:
            return { isLoading: true, error: "", payload: null};
        case actionsType.PETS_SUCCESS:
            return { isLoading: false, error: "", payload: payload };
        case actionsType.PETS_FAIL:
            return { isLoading: false, error: payload, payload: null };
        default:
            return state;
    }
}