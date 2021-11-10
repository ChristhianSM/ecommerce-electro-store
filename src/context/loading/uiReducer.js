import { types } from "../../types/types";

export const uiReducer = (state, action) => {
    switch (action.type) {
        case types.uiStartLoading:
            console.log("Iniciando");
            return {
                ...state,
                loading: true,
            }

        case types.uiFinishLoading:
            console.log("Terminando");
            return {
                ...state,
                loading: false
            }
    
        default:
            return state
    }
}