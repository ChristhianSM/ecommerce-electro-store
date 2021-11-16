import { types } from "../../types/types";

export const modalReducer = (state, action) => {
    switch (action.type) {
        case types.modalChangeShoppingCart:
            return {
                animationsShoppingCart: false,
                modalOrder : false,
                orderActive: null,
                modalImgProduct : false,
                modalShoppingCart: action.payload,
            }
            case types.modalAnimationsShoppingCart:
                return {
                    ...state,
                    animationsShoppingCart: action.payload,
                }
            case types.modalChangeOrder:
                return {
                    ...state,
                    modalOrder: action.payload,
                }
            case types.modalSetImgProduct:
                return {
                    ...state,
                    dataProduct: action.payload,
                }
            case types.modalChangeProduct:
                return {
                    ...state,
                    modalImgProduct: action.payload,
                }
                
        default:
            return state
    }
}