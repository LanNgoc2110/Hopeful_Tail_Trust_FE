import actionsType from "../actions/action.type";

export const petsReducer = (
    state = { isLoading: false, error: "", payload: null },
    action) => {
    const { type, payload } = action;
    switch (type) {
        case actionsType.PETS_START:
            return { isLoading: true, error: "", payload: null };
        case actionsType.PETS_SUCCESS:
            return { isLoading: false, error: "", payload: payload };
        case actionsType.GET_PET_BY_QUERY:
            // console.log(payload);
            
            // return { isLoading: false, error: "", payload: payload.data };
            const sortedData = payload.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return { isLoading: false, error: "", payload: {...payload, data: sortedData} };
        case actionsType.GET_PET_BY_ID:
            return { isLoading: false, error: "", payload: payload.data };
        case actionsType.PETS_FAIL:
            return { isLoading: false, error: payload, payload: null };
        default:
            return state;
    }
}