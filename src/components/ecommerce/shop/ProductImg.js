import React, { useContext, useEffect, useState } from 'react'
import ProductContext from '../../../context/product/ProductContext';

export const ProductImg = ({picture, setImgSeleccionada}) => {

    // UseContext para obtener el state 
    const {state:stateProduct} = useContext(ProductContext);
    const [selected, setSelected] = useState(false);
    
    
    useEffect(() => {
        console.log(picture.secure_url);
    }, [picture.secure_url]);


    const changeImg = (id) => {
        const picture = stateProduct.selectedProduct.pictures.find( img => img.id === id);
        setImgSeleccionada(picture.secure_url)
        setSelected(true);
    }

    return (
        <div 
            className = {`border border-gray-300 mb-2 h-14 rounded-md cursor-pointer hover:border-purple-500 ${selected && "border-purple-600"}`} 
            onClick = {() => {
                changeImg(picture.id);
            }}
        >
            <img src={picture.secure_url} alt="" className = "w-full h-full object-contain"/>
        </div>
    )
}
