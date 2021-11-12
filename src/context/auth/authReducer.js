import { types } from "../../types/types";

export const authReducer = (state, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state, 
                uid : action.payload.uid,
                name : action.payload.name
            }
        case types.logout:
            return {
                uid : '',
                name : '',
                lastName: '',
                email: '',
                favoritesProducts : [],
            }

        case types.dataUser:
            return {
                ...state,
                ...action.payload,
            }
        case types.favoriteProductAdd:
            return {
                ...state,
                favoritesProducts : [...state.favoritesProducts, action.payload],
            }

        case types.favoriteProductDelete:
            return {
                ...state,
                favoritesProducts : state.favoritesProducts.filter( product => product.id !== action.payload.id),
            }

        case types.saveOrder:
            return {
                ...state,
                orders : [action.payload, ...state.orders]
            }
        case types.setActiveOrder:
            return {
                ...state,
                activeOrder : action.payload
            }

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
            return state;
    }
}
