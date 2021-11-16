import React, { useContext, useEffect, useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import { useParams } from 'react-router'

import { NavBar } from '../../ui/NavBar'
import ProductContext from '../../../context/product/ProductContext'
import AuthContext from '../../../context/auth/AuthContext'
import { ProductContainer } from './ProductContainer'

export const ProductScreen = () => {
    const {id} = useParams();

    // UseContext para obtener el state 
    const {setSelectProduct} = useContext(ProductContext);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setSelectProduct();
        setLoading(true);
        const getSelectProduct = async () => {
            await setSelectProduct(id); 
            setLoading(false);
        }
        getSelectProduct();
    }, [id]);

    return (
        <>
            <NavBar />
            {   
                loading ?
                <div className = "w-full h-screen bg-black bg-opacity-10 mt-40 flex justify-start items-center">
                    <SpinnerCircular size={150} thickness={117} speed={103} color="rgba(120, 57, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" className = "mx-auto"/>
                </div>
                :
                <ProductContainer />
            }
        </>
    )
}
