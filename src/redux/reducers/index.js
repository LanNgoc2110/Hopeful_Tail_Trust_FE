import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { petsReducer } from "./pets.reducer";

export const reducers = combineReducers ({
    authReducer,
    petsReducer
})