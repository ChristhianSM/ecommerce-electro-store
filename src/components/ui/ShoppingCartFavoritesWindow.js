import React, { useContext } from 'react'
import {IoHeartDislikeOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext';
import { ShoppingCartFavoriteProduct } from './ShoppingCartFavoriteProduct';

export const ShoppingCartFavoritesWindow = ({setModal, modal}) => {
    const {state} = useContext(AuthContext);

    return (
        <>
            {
                state.uid 
                ? state.favoritesProducts.length > 0 
                ?  
                <>
                    <ul className="flex flex-col flex-grow">
                    {
                        state.favoritesProducts.map( product =>{
                            return(
                                <ShoppingCartFavoriteProduct
                                    key = {product.id}
                                    product = {product}
                                />
                            )
                        })
                        
                    }
                    </ul>
                        <button
                        className="px-6 py-2 border rounded-md bg-purple-600 text-white w-full" 
                        onClick = {() => {
                            setModal(!modal)
                        }} 
                    >Cerrar</button>
                </> 
                :    
                <div className = "h-screen flex flex-col justify-between">
                    <div className = "text-center flex flex-col flex-grow justify-center items-center animate__animated animate__bounceIn">
                        <IoHeartDislikeOutline className = "text-8xl text-purple-600 mx-auto mb-4"></IoHeartDislikeOutline>
                        <p className = "w-1/2 text-purple-600 font-bold mb-4">Tu lista de favoritos está vacía</p>
                    </div>
                    <button
                        className="px-6 py-2 border rounded-md bg-purple-600 text-white w-full" 
                        onClick = {() => {
                            setModal(!modal)
                        }} 
                    >Cerrar</button>
                </div>
                :
                <div className = "h-screen flex flex-col justify-between">
                    <div className = "text-center flex flex-col flex-grow justify-center items-center animate__animated animate__bounceIn">
                        <IoHeartDislikeOutline className = "text-8xl text-purple-600 mx-auto mb-4"></IoHeartDislikeOutline>
                        <p className = "w-1/2 text-purple-600 font-bold mb-4">Inicia sesión para agregar tus productos a favoritos</p>
                        <Link to = "/login">
                            <button className="px-6 py-2 border rounded-md bg-purple-600 text-white hover:bg-purple-700 mb-4">Inicia Sesión</button>
                        </Link>
                        <p className = "text-purple-600 font-semibold">
                            ¿No estás registrado? 
                            <Link to = "/register">
                                <span className = "underline text-gray-600 cursor-pointer"> Hazlo aquí </span>
                            </Link>
                        </p>
                    </div>
                    <button
                        className="px-6 py-2 border rounded-md bg-purple-600 text-white w-full" 
                        onClick = {() => {
                            setModal(!modal)
                        }} 
                    >Cerrar</button>
                </div>
                
            }
        </>
    )
}
