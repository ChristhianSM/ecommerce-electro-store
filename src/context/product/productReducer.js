import { types } from "../../types/types";

export const productReducer = (state, action) =>{
    switch (action.type) {
        case types.loadProduct:
            return {
                ...state,
                products : action.payload
            }

        case types.loadFeaturedProducts:
            return {
                ...state,
                featuredProducts : action.payload
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
    
        default:
            return {
                state
            }
    }
}