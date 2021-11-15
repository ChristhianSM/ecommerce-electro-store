
import React, { useReducer } from 'react'
import ProductContext from './ProductContext';
import { productReducer } from './productReducer'
import { types } from '../../types/types';
import { alertAddProduct } from '../../helpers/alerts';
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';
import { getDocumentByQuery, getDocuments } from '../../firebase/firebaseData';
import { getDataProductId } from '../../helpers/functions';

const ProductState = ({children}) => {

    const initialState = {
        products : [],
        featuredProducts : [],
        filters: [],
        filteredProducts : [],
        shoppingCart : getLocalStorage("ShoppingCart") || [],
        selectedProduct : {},
        loading: false,
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    // Insertamos en el localStorage el carrito de compras
    setLocalStorage(state.shoppingCart)

    const startLoadingProducts = async () => {
        // Obtenemos los productos de firebase
        const data = await getDocuments("PRODUCTS");

        // Actualizamos el estado de la applicacion
        dispatch({
            type : types.loadProduct,
            payload : data
        })

        const featuredProducts = data.filter(product => product.destacado);
        dispatch({
            type : types.loadFeaturedProducts,
            payload : featuredProducts
        })
    }

    const loadFeaturedProducts = async () => {
        
        // Obtenemos los productos de firebase
        const data = await getDocumentByQuery("PRODUCTS", {
            key: "destacado",
            condition : "==",
            value: true
        });

        // Actualizamos el estado de la applicacion
        dispatch({
            type : types.loadFeaturedProducts,
            payload : data
        });
    }

    const getMarcaProducts = (products) => {
        // const marcas = products.filter( product => )
    }

    const getProductsForCategory = async (category) => {
        // Obtenemos los productos de firebase
        const data = await getDocumentByQuery("PRODUCTS", {
            key: "type",
            condition : "==",
            value: category
        });

        dispatch({
            type: types.loadProductsForCategory,
            payload: data
        })
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

    const getProductsForFilters = (category) => {
        let products = [];
        state.filters.forEach( marca => {
            state.products.forEach( product => {
                if (product.marca === marca && product.type === category) {
                    products.push(product);
                }
            })   
        })
        if (state.filters.length === 0) {
            getProductsForCategory(category)
        }else{
            dispatch({
                type: types.loadProductsForCategory,
                payload: products
            })
        }
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
            const updatedProduct = state.shoppingCart.find( item => (item.id === newProduct.id));
            if (updatedProduct.amount < parseInt(updatedProduct.stock)) {
                updatedProduct.amount ++;
                alertAddProduct("Producto actualizado correctamente");
            }else{
                alertAddProduct(`Solo contamos con ${updatedProduct.stock} unidades de este producto`);
            }

            dispatch({
                type: types.shoppingCartUpdateAmountProduct,
                payload : updatedProduct,
            })

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

    const clearShoppingCart = () => {
        dispatch({
            type: types.shoppingCartClear,
        })
    }

    const setSelectProduct = async (id) => {
        if (id) {
            const [product, description, similarsProducts] = await getDataProductId(id);
            dispatch({
                type: types.productSelectProduct,
                payload : {
                    ...product,
                    description, 
                    similarsProducts
                },
            })
        }else{
            dispatch({
                type: types.productSelectProduct,
                payload : {},
            })
        }
    }


    return (
        <ProductContext.Provider
            value = {{
                state,

                startLoadingProducts,
                loadFeaturedProducts,
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
                clearShoppingCart,

                // Funciones para el producto seleccionado
                setSelectProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductState
