
import React, { useReducer } from 'react'
import ProductContext from './ProductContext';
import { productReducer } from './productReducer'
import data from '../../helpers/data.json'
import { types } from '../../types/types';
import { alertAddProduct } from '../../helpers/alerts';
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';

const ProductState = ({children}) => {

    const initialState = {
        products : [],
        featuredProducts : [],
        filters: [],
        filteredProducts : [],
        filteredProductsForFilters : [],
        shoppingCart : getLocalStorage("ShoppingCart") || [],
        selectedProduct : null,
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    // Insertamos en el localStorage el carrito de compras
    setLocalStorage(state.shoppingCart)

    const startLoadingProducts = () => {
        // Obtenemos los productos de firebase

        // Actualizamos el estado de la applicacion
        dispatch({
            type : types.loadProduct,
            payload : data.products
        })

        const featuredProducts = data.products.filter(product => product.destacado);
        dispatch({
            type : types.loadFeaturedProducts,
            payload : featuredProducts
        })
    }

    // const uploadFeaturedProducts = () => {
    //     // const featuredProducts = products.filter(product => product.destacado);
    //     // dispatch({
    //     //     type: types.loadFeaturedProducts,
    //     // })
    // }

    const getMarcaProducts = (products) => {
        // const marcas = products.filter( product => )
    }

    const getProductsForCategory = (category, products) => {
        const productsForCategory = products.filter( product => product.type === category);
        dispatch({
            type: types.loadProductsForCategory,
            payload: productsForCategory
        })

        // dispatch({
        //     type: types.setFilteredProductsForFilters,
        //     payload: productsForCategory
        // })
    }

    /* Funciones para el filtrado de productos */
    const setFilters = (filters) => {
        dispatch({
            type : types.setFilters,
            payload: filters,
        })
    }
    const deleteFilter = () => {
        dispatch({
            type : types.deleteFilters,
        })
    }

    const getProductsForFilters = () => {
        let products = [];
        state.filters.forEach( marca => {
            state.filteredProducts.forEach( product => {
                if (product.marca === marca) {
                    products.push(product);
                }
            })   
        })
        dispatch({
            type: types.setFilteredProducts,
            payload: products
        })
    }

    const getProductsForOrder = (products) => {
        dispatch({
            type: types.setProductsForOrder,
            payload : products
        })
    }
    

    /* Shopping Cart */
    const addProductShoppingCart = (product) => {
        const newProduct = {
            ...product,
            amount : 1,
        }

        const isRepit = state.shoppingCart.some( stateProduct => stateProduct.id === newProduct.id);

        if (isRepit) {
            const updatedProduct = state.shoppingCart.find( item => item.id === newProduct.id);
            updatedProduct.amount ++;

            dispatch({
                type: types.shoppingCartUpdateAmountProduct,
                payload : updatedProduct,
            })
            alertAddProduct("Producto actualizado correctamente");
        }else{
            dispatch({
                type: types.shoppingCartAddProduct,
                payload : newProduct
            })

            alertAddProduct("Producto agregado correctamente");
        }
    }

    const removeProductShoppingCart = (idProduct) => {
        dispatch({
            type: types.shoppingCartRemoveProduct,
            payload : idProduct
        })
    }

    const updateAmountShoppingCart = (idProduct, newAmount) => {
        dispatch({
            type: types.shoppingCartIncrementOrDecrementAmountProduct,
            payload : {
                idProduct, 
                newAmount
            }
        })
    }

    return (
        <ProductContext.Provider
            value = {{
                state,

                startLoadingProducts,
                // uploadFeaturedProducts,
                getMarcaProducts,
                getProductsForCategory,

                // Funciones para filtros
                setFilters,
                deleteFilter,
                getProductsForFilters,
                getProductsForOrder,

                // Funciones para carrito de compras
                addProductShoppingCart,
                updateAmountShoppingCart,
                removeProductShoppingCart,

                // addOrDeleteProductFavorite,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductState
