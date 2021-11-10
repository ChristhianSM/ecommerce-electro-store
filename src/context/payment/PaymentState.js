import { useReducer } from "react";
import { types } from "../../types/types";
import { uiReducer } from "../loading/uiReducer";
import PaymentContext from "./PaymentContext";
import { paymentReducer } from "./paymentReducer";

const PaymentState = ({children}) => {
    
    const initialState = {
        typeShipping : 'tienda',
        dataFacturation: {
            name : '',
            telefono: '',
            email: '',
            direccion: '',
            cardNumber : '',
            dateExpire : '',
            cvc : ''
        },
        coutas: '',
        couponDiscount: 0,
        subtotal : 0,
        total: 0,
        totalForcouponDiscount: 0,
        totalForShippingType: 0,
        back:0,
        loading : false,
    }
    const initialStateLoading = {
        loading : false,
    }

    const [state, dispatch] = useReducer(paymentReducer, initialState);

    const setDataPayment = (total) => {
        dispatch({
            type: types.paymentSetDataInitial,
            payload: total,
        })
    }

    const applyCouponDiscount = (coupon, subtotal) => {
        dispatch({
            type: types.uiStartLoading
        })
        setTimeout(() => {
            if (coupon === "HOLA") {
                dispatch({
                    type: types.paymentCouponDiscount,
                    payload: {
                       couponDiscount :subtotal*0.10,
                       total: subtotal - subtotal*0.10,
                       back : subtotal - subtotal*0.10,
                    },
                })
            }else {
                dispatch({
                    type: types.paymentCouponDiscount,
                    payload: {
                       couponDiscount :0,
                       total: subtotal,
                       back : subtotal
                    },
                })
            }
            dispatch({
                type: types.uiFinishLoading
            })
        }, 3000);
    }

    const changeEnvio = (shippingType) => {
        dispatch({
            type: types.paymentShippingType,
            payload : shippingType
        })
    }

    const getTotalWhithDiscount = (shippingType) => {  
        if (shippingType === "tienda") {
            dispatch({
                type: types.paymentGetTotalWithDiscount,
                payload : state.back
            })
        }else {
            dispatch({
                type: types.paymentGetTotalWithDiscount,
                payload : state.total + 30
            })
        }
    }

    const setDataUserPayment = (data) => {
        dispatch({
            type: types.paymentSetDataUser,
            payload : data
        })
    }

    const resetPayment = () => {
        dispatch({
            type: types.paymentReset,
            payload : initialState
        })
    }


    return(
        <PaymentContext.Provider
            value = {{
                state,
                setDataPayment,
                applyCouponDiscount,
                changeEnvio,
                getTotalWhithDiscount,
                setDataUserPayment,
                resetPayment,
            }}
        >
            {children}
        </PaymentContext.Provider>
    )
}

export default PaymentState