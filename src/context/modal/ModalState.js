import { useReducer } from "react"
import { types } from "../../types/types"
import ModalContext from "./ModalContext"
import { modalReducer } from "./modalReducer"

const ModalState = ({children}) => {
    const initialState = {
        modalShoppingCart : false,
        animationsShoppingCart: false,
        modalOrder : false,
        orderActive: null,
        modalImgProduct : false,
        dataProduct : null,
    }

    const [state, dispatch] = useReducer(modalReducer, initialState);

    const changeStateModalShoppingCart = (openOrClose) => {
        dispatch({
            type: types.modalChangeShoppingCart,
            payload : openOrClose,
        })
    }

    const animationsModalShoppingCart = (boolean) => {
        dispatch({
            type: types.modalAnimationsShoppingCart,
            payload : boolean,
        })
    }

    const changeStateModalOrder = (openOrClose) => {
        dispatch({
            type: types.modalChangeOrder,
            payload : openOrClose,
        })
    }

    const setDataImgProduct = (product) => {
        dispatch({
            type: types.modalSetImgProduct,
            payload : product,
        })
    }

    const changeStateModalProduct = (openOrClose) => {
        dispatch({
            type: types.modalChangeProduct,
            payload : openOrClose,
        })
    }

    return(
        <ModalContext.Provider
            value = {{
                state,

                changeStateModalShoppingCart,
                animationsModalShoppingCart,
                changeStateModalOrder,
                setDataImgProduct,
                changeStateModalProduct
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalState;