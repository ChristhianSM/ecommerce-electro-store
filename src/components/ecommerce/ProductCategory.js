import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ProductContext from '../../context/product/ProductContext';
import { Product } from './Product';

export const ProductCategory = () => {
    const params = useParams();
    const {state, getProductsForCategory} = useContext(ProductContext)

    useEffect(() => {
        getProductsForCategory(params.category, state.products);
    }, [params.category])

    return (
        <div className="container mx-auto border p-2 rounded-lg bg-gray-300 col-span-3 animate__animated animate__fadeInRight">
            <div className="grid grid-cols-3 gap-4">
                {
                    state.filteredProductsForFilters.length === 0 
                    ?
                    state.filteredProducts &&
                    state.filteredProducts.map( product => {
                        return(
                            <Product 
                                key = {product.id}
                                product = {product}
                            />
                        )
                    })
                    :
                    state.filteredProductsForFilters.map( product => {
                        return(
                            <Product 
                                key = {product.id}
                                product = {product}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
