import actionsType from "../actions/action.type";

export const authReducer = (
    state = { isLoading: false, error: "", payload: null },
    action) => {
    const { type, payload } = action;
    switch (type) {
        case actionsType.AUTH_START:
            return { isLoading: true, error: "", payload: null};
        case actionsType.AUTH_LOGIN_SUCCESS:
            localStorage.setItem("token", JSON.stringify(payload.token));
            return { isLoading: false, error: "", payload: payload };
        case actionsType.AUTH_FAIL:
            return { isLoading: false, error: payload, payload: null };
        case actionsType.AUTH_LOGOUT:
            localStorage.removeItem("token");
            return { isLoading: false, error: "", payload: null };
        default:
            return state;
    }
}