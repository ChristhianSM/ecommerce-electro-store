import React, { useContext, useEffect } from 'react'
import ProductContext from '../../../context/product/ProductContext'
import { NavBar } from '../../ui/NavBar'
import { FeaturedProducts } from './FeaturedProducts'

export const HomeScreen = () => {

    const {startLoadingProducts} = useContext(ProductContext);

    useEffect(() => {
        startLoadingProducts();
    }, [])
    
    return (
        <>
            <>
                <NavBar />
                <FeaturedProducts />
            </>
        </>
    )
}
