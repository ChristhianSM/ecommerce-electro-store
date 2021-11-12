import { types } from "../../types/types";

export const paymentReducer = (state, action) => {
    switch (action.type) {
        case types.paymentSetDataInitial:
            return {
                ...state,
                subtotal : action.payload
            }
        case types.paymentCouponDiscount:
            return {
                ...state,
                couponDiscount : action.payload.couponDiscount,
                total : action.payload.total,
                back : action.payload.total
            }
        case types.paymentReset:
            return {
                ...action.payload,
            }
        case types.paymentShippingType:
            return {
                ...state,
                typeShipping : action.payload
            }
        case types.paymentGetTotalWithDiscount:
            return {
                ...state,
                total : action.payload
            }
        case types.paymentSetDataUser:
            return {
                ...state,
                dataFacturation : action.payload
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading: true,
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            }
    
        default:
            return state
    }
}