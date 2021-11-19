import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { SwipperSimilarProduct } from './SwipperSimilarProduct'
import {MdFavorite, MdFavoriteBorder} from 'react-icons/md'

import AuthContext from '../../../context/auth/AuthContext';
import ProductContext from '../../../context/product/ProductContext';
import { ProductCharacteristics } from './ProductCharacteristics'
import { ProductDescription } from './ProductDescription'
import { ProductDevolution } from './ProductDevolution'

export const ProductContainer = () => {

    const {id} = useParams();

    // UseContext para obtener el state 
    const {state:stateProduct, addProductShoppingCart, setSelectProduct} = useContext(ProductContext);
    const {state:stateAuth,  addOrDeleteProductFavorite} = useContext(AuthContext);


    const [favorite, setFavorite] = useState(false);
    const [component, setComponent] = useState({
        componentDescription : true,
        componentDevolution: false,
        componentCharacteristics: false,
    })
    const [imgSeleccionada, setImgSeleccionada] = useState(stateProduct.selectedProduct.pictures[0].secure_url);

    useEffect(() => {
        const favoriteProduct = stateAuth.favoritesProducts.find( itemProduct => itemProduct.id === id);
        if (favoriteProduct) {
            setFavorite(true);
        }else{
            setFavorite(false);
        }
    }, [id, stateAuth.favoritesProducts]);

    const changeImg = (id) => {
        const picture = stateProduct.selectedProduct.pictures.find( img => img.id === id);
        setImgSeleccionada(picture.secure_url)
    }

    const handleFavoriteProduct = () => {
        const product = {
            ...stateProduct.selectedProduct,
            id
        }
        addOrDeleteProductFavorite(product)
    }

    const handleAddProduct = () => {
        const product = {
            ...stateProduct.selectedProduct,
            id
        }
        addProductShoppingCart(product);
    }


    return (
        <section className = "mx-auto max-w-4xl container mt-48">
            <div className = "flex mt-10 gap-10">
                <div className = "w-1/12 h-96">
                    {   
                        Object.keys(stateProduct.selectedProduct).length > 0 &&
                        stateProduct.selectedProduct.pictures.map((picture, index) => {
                            if (index > 5) {
                                return null
                            }else{
                                return(
                                    <div 
                                        className = "border border-gray-300 mb-2 h-14 rounded-md cursor-pointer hover:border-purple-500" key = {picture.id}
                                        onClick = {() => {
                                            changeImg(picture.id);
                                        }}
                                    >
                                        <img src={picture.secure_url} alt="" className = "w-full h-full object-contain"/>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div className = "w-5/12 h-96">
                    <img src={imgSeleccionada} alt={stateProduct.selectedProduct.title} className = "h-full m-auto object-contain"/>
                </div>
                <div className = "w-5/12">
                    <h3 className = "font-bold text-2xl mb-5">{stateProduct.selectedProduct.title}</h3>
                    {
                        stateProduct.selectedProduct.original_price &&
                        <div className = "flex justify-between mb-2 font-light text-lg">
                            <p className = "">Antes</p>
                            <p className = "line-through">S/. {stateProduct.selectedProduct.original_price}</p>
                        </div>
                    }
                    <div className = "flex justify-between mb-4 font-medium text-lg">
                        <p>Ahora</p>
                        <p className = "text-3xl">S/. {stateProduct.selectedProduct.price}</p>
                    </div>
                    {
                        stateProduct.selectedProduct.original_price &&
                        <div className = "flex justify-between mb-4 font-medium text-lg items-center">
                            <p>Descuento</p>
                            <p className = "bg-red-500 p-2 rounded-lg text-white">{(100 - stateProduct.selectedProduct.price*100/stateProduct.selectedProduct.original_price).toFixed(0) }%</p>
                        </div>
                    }

                    <div className = "flex w-full bg-purple-500 rounded-lg border-purple-500 border-2 overflow-hidden">
                        <div 
                            className = "w-20 p-2 bg-white cursor-pointer" 
                            onClick = { handleFavoriteProduct}
                        >   
                            {
                                favorite ? 
                                <MdFavorite
                                    className = "w-full h-7 text-purple-600 animate__animated animate__bounceIn"
                                />
                                : 
                                <MdFavoriteBorder
                                    className = "w-full h-7 animate__animated text-purple-500"
                                />
                            }
                        </div>
                        <button 
                            className = "w-full text-white font-medium text-lg"
                            onClick = {handleAddProduct}
                        >
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
            <div className = "border-t border-gray-300 mt-12 pt-8">
                <p className = "my-5 font-semibold text-xl">LOS CLIENTES QUE VIERON ESTE PRODUCTO TAMBIÉN VIERON</p>
                <SwipperSimilarProduct 
                    similarProducts = {stateProduct.selectedProduct.similarsProducts}
                />
            </div>
            <div className = "border-t border-gray-300 mt-12 pt-8 flex justify-between">
                <button 
                    className = {`my-5 font-semibold text-xl border-b-4 w-full pb-2 ${component.componentDescription && "border-purple-500 transition-all duration-500 ease-in-out"}`}
                    onClick =  { () =>  setComponent({
                        componentDescription : true,
                        componentDevolution: false,
                        componentCharacteristics: false,
                    })}
                >Description del Producto</button> 
                <button 
                    className = {`my-5 font-semibold text-xl border-b-4 w-full pb-2 ${component.componentCharacteristics && "border-purple-500 transition-all duration-500 ease-in-out"}`}
                    onClick =  { () =>  setComponent({
                        componentDescription : false,
                        componentCharacteristics: true,
                        componentDevolution: false,
                    })}
                >Caracteristicas del producto</button> 
                <button 
                    className = {`my-5 font-semibold text-xl border-b-4 w-full pb-2 ${component.componentDevolution && "border-purple-500 transition-all duration-500 ease-in-out"}`}
                    onClick =  { () =>  setComponent({
                        componentDescription : false,
                        componentCharacteristics: false,
                        componentDevolution: true,
                    })}
                >Cambios y devoluciones</button> 
            </div>
                {
                    component.componentCharacteristics &&
                    <ProductCharacteristics 
                        attributes = {stateProduct.selectedProduct.attributes}
                    />
                }
                {
                    component.componentDescription &&
                    <ProductDescription
                        description = {stateProduct.selectedProduct.description}
                    />
                }
                {
                    component.componentDevolution &&
                    <ProductDevolution 
                        
                    />
                }
        </section>
    )
}
