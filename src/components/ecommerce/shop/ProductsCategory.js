import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ProductContext from '../../../context/product/ProductContext';
import { Product } from './Product';

export const ProductsCategory = () => {
    const {state} = useContext(ProductContext)

    return (
        <div className="container mx-auto border p-2 rounded-lg bg-gray-300 col-span-3 animate__animated animate__fadeInRight">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {
                    
                    state.filteredProducts &&
                    state.filteredProducts.map( product => {
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