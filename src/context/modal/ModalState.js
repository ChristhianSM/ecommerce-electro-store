import { useReducer } from "react"
import { types } from "../../types/types"
import ModalContext from "./ModalContext"
import { modalReducer } from "./modalReducer"


const ModalState = ({children}) => {
    const initialState = {
        modalShoppingCart : false,
        modalOrder : false,
        modalImgProduct : false,
    }

    const [state, dispatch] = useReducer(modalReducer, initialState);

    const changeStateModal = () => {
        dispatch({
            type: types.modalChange,
        })
    }

    return(
        <ModalContext.Provider
            value = {{
                state,
                
                changeStateModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export default ModalState;