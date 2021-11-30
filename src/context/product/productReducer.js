import { types } from "../../types/types";

export const productReducer = (state, action) =>{
    switch (action.type) {
        
        case types.loadFeaturedProducts:
            return {
                ...state,
                filteredProducts : action.payload
            }

        case types.loadProductsForCategory:
            return {
                ...state,
                filteredProducts : action.payload
            }

        // Acciones para filtros
        case types.setFilters:
            return {
                ...state,
                filters : action.payload
            }
        case types.deleteFilters:
            return {
                ...state,
                filters : []
            }
        case types.setProductsForOrder:
            return {
                ...state,
                filteredProducts : action.payload
            }

        case types.setProductsForSearch:
            return {
                ...state,
                filteredProducts : action.payload.products,
                search : action.payload.query
            }

        case types.setProductsForRange:
            return {
                ...state,
                filteredProducts : action.payload,
            }

        case types.clearSearch:
            return {
                ...state,
                search : null
            }
        
        // Shopping cart
        case types.shoppingCartAddProduct:
            return {
                ...state,
                shoppingCart : [...state.shoppingCart, action.payload]
            }
    
        case types.shoppingCartUpdateAmountProduct:
            return {
                ...state,
                shoppingCart : state.shoppingCart.map( product => {
                    if (product.id === action.payload.id) {
                        return action.payload
                    }else{
                        return product
                    }
                })
            }

        case types.shoppingCartIncrementOrDecrementAmountProduct:
            return {
                ...state,
                shoppingCart : state.shoppingCart.map( product => {
                    if (product.id === action.payload.idProduct) {
                        return {
                            ...product,
                            amount: action.payload.newAmount
                        }
                    }else{
                        return product
                    }
                })
            }

        case types.shoppingCartRemoveProduct:
            return {
                ...state,
                shoppingCart : state.shoppingCart.filter( product => product.id !== action.payload)
            }

        case types.shoppingCartClear:
            return {
                ...state,
                shoppingCart : []
            }

        case types.productSelectProduct:
            return {
                ...state,
                selectedProduct : action.payload
            }

        case types.uiStartLoading:
            return {
                ...state,
                loading : true
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading : false,
            }
    
        default:
            return {
                state
            }
    }
}