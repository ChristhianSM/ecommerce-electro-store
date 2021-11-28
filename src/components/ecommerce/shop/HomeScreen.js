import React, { useContext, useEffect } from 'react'
import ProductContext from '../../../context/product/ProductContext'
import { NavBar } from '../../ui/NavBar'
import { SwipperBanner } from '../../ui/SwipperBanner'
import { FeaturedProducts } from './FeaturedProducts'

export const HomeScreen = () => {

    const {loadFeaturedProducts} = useContext(ProductContext);

    useEffect(() => {
        loadFeaturedProducts();
    }, [])
    
    return (
        <>
            <>
                <NavBar />
                <SwipperBanner />
                <FeaturedProducts />
            </>
        </>
    )
}
