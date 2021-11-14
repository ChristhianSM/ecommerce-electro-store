import React, { useContext, useEffect, useState } from 'react'
import { NavBar } from '../../ui/NavBar'
import {BiHeart} from 'react-icons/bi'
import { useParams } from 'react-router'
import { getDataProductId } from '../../../helpers/functions'
import ProductContext from '../../../context/product/ProductContext'
import AuthContext from '../../../context/auth/AuthContext'

export const ProductScreen = () => {
    const {id} = useParams();

    // UseContext para obtener el state 
    const {addProductShoppingCart} = useContext(ProductContext);
    const {state:stateAuth,  addOrDeleteProductFavorite} = useContext(AuthContext);

    const [product, setProduct] = useState([]);
    const {title, thumbnail, original_price,  price, pictures}= product;
    const [imgSeleccionada, setImgSeleccionada] = useState(thumbnail);
    
    useEffect(() => {
        const getData = async (id) => {
            const product = await getDataProductId(id);
            setProduct(product);
        }
        getData(id);

    }, [id])

    const changeImg = (id) => {
        const picture = pictures.find( img => img.id === id);
        console.log(picture);
        setImgSeleccionada(picture.secure_url)
    }

    return (
        <>
            <NavBar />
            <section className = "mx-auto max-w-4xl container mt-48">
                <div className = "flex mt-10 gap-10">
                    <div className = "w-1/12">
                        {   
                            pictures &&
                            pictures.map(picture => {
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
                            })
                        }
                    </div>
                    <div className = "w-5/12">
                        <img src={imgSeleccionada} alt={title} className = "h-full m-auto object-contain"/>
                    </div>
                    <div className = "w-5/12">
                        <h3 className = "font-bold text-2xl mb-5">{title}</h3>
                        <div className = "flex justify-between mb-2 font-light text-lg">
                            <p className = "">Antes</p>
                            <p className = "line-through">S/. {original_price}</p>
                        </div>
                        <div className = "flex justify-between mb-2 font-medium text-lg">
                            <p>Ahora</p>
                            <p className = "text-3xl">S/. {price}</p>
                        </div>
                        <div className = "flex justify-between mb-4 font-medium text-lg">
                            <p>Descuento</p>
                            <p className = "bg-red-500 p-2 rounded-lg text-white">{(100 - price*100/original_price).toFixed(0) }%</p>
                        </div>

                        <div className = "flex w-full bg-purple-500 rounded-lg border-purple-500 border-2 overflow-hidden">
                            <div 
                                className = "w-20 p-2 bg-white" 
                                onClick = { () => addOrDeleteProductFavorite(product)}
                            >
                                <BiHeart className = "w-10 h-8 mx-auto text-purple-500"/>
                            </div>
                            <button 
                                className = "w-full text-white font-medium text-lg"
                                onClick = {() => addProductShoppingCart(product)}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
                <div className = "border-t border-gray-300">
                    <p className = "my-5">LOS CLIENTES QUE VIERON ESTE PRODUCTO TAMBIÉN VIERON</p>
                </div>
            </section>
        </>
    )
}
