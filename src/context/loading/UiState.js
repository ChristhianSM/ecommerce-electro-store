import { useReducer } from "react"
import { types } from "../../types/types"
import UiContext from "./UiContext"
import { uiReducer } from "./uiReducer"


const UiState = ({children}) => {
    const initialState = {
        loading : false,
    }

    const [state, dispatch] = useReducer(uiReducer, initialState);

    const startLoading = () => {
        dispatch({
            type: types.uiStartLoading,
            payload : true,
        })
    }
    const finishLoading = () => {
        dispatch({
            type: types.uiFinishLoading,
            payload : false,
        })
    }

    return(
        <UiContext.Provider
            value = {{
                state,
                
                startLoading,
                finishLoading
            }}
        >
            {children}
        </UiContext.Provider>
    )
}

export default UiState;