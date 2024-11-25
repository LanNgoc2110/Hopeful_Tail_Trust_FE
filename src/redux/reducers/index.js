import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { petsReducer } from "./pets.reducer";
import { productsReducer } from "./products.reducer";

export const reducers = combineReducers ({
    authReducer,
    petsReducer,
    productsReducer
})