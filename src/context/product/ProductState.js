
import React, { useReducer } from 'react'
import ProductContext from './ProductContext';
import { productReducer } from './productReducer'
import { types } from '../../types/types';
import { alertAddProduct } from '../../helpers/alerts';
import { getLocalStorage, setLocalStorage } from '../../helpers/localStorage';
import { getDocumentByQuery, getDocuments, getMarcasForSearch } from '../../firebase/firebaseData';
import { getDataProductId } from '../../helpers/functions';

const ProductState = ({children}) => {

    const initialState = {
        products : [],
        search: null,
        filters: [],
        filteredProducts : [],
        shoppingCart : getLocalStorage("ShoppingCart") || [],
        selectedProduct : {},
        loading: false,
    }

    const [state, dispatch] = useReducer(productReducer, initialState);

    // Insertamos en el localStorage el carrito de compras
    setLocalStorage(state.shoppingCart)

    const loadFeaturedProducts = async () => {
        dispatch({
            type: types.uiStartLoading
        })

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

        dispatch({
            type: types.uiFinishLoading
        })
        
    }

    const getProductsForCategory = async (category) => {
        dispatch({
            type: types.uiStartLoading
        })

        // Obtenemos los productos de firebase
        const data = await getDocumentByQuery("PRODUCTS", {
            key: "type",
            condition : "==",
            value: category
        });
        const products = data.filter(product => product.marca !== null);
        dispatch({
            type: types.loadProductsForCategory,
            payload: products
        })

        dispatch({
            type: types.uiFinishLoading
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

    const getProductsForFilters = async (category) => {
        let products = [];

        const data = await getDocuments("PRODUCTS");

        state.filters.forEach( marca => {
            data.forEach( product => {
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

    const getProductsForSearch = async (query) => {
        // Obtenemos los productos de firebase
        const data = await getDocuments("PRODUCTS");

       dispatch({
           type: types.uiStartLoading
       })
       const products = data.filter( product => {
           if (product.title.toLowerCase().includes(query) || product.marca?.toLowerCase().includes(query)) {
               return product
           }
       });

       dispatch({
           type: types.setProductsForSearch,
           payload:{
               products,
               query,
           }
       })

       setTimeout(() => {
           dispatch({
               type: types.uiFinishLoading
           })
       }, 1000);
   }

    const getProductsForFiltersSearch = async () => {
        let products = [];
        
        const [,,filteredProducts] = await getMarcasForSearch(state.search);

        state.filters.forEach( marca => {
            filteredProducts.forEach( product => {
                if (product.marca === marca && product.marca !== null) {
                    products.push(product);
                }
            })   
        });

        console.log(products);
        if (state.filters.length === 0) {
            getProductsForSearch(state.search);
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
    
    const clearSearch = () => {
        dispatch({
            type: types.clearSearch,
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

                // startLoadingProducts,
                loadFeaturedProducts,
                getProductsForCategory,

                // Funciones para filtros
                setFilters,
                deleteFilter,
                getProductsForFilters,
                getProductsForOrder,
                getProductsForSearch,
                getProductsForFiltersSearch,
                clearSearch,

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
