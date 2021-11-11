import React, { useContext, useEffect, useState } from 'react'

import {BiHeart} from 'react-icons/bi'
import {BsHeartFill} from 'react-icons/bs'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthContext from '../../context/auth/AuthContext'
import ProductContext from '../../context/product/ProductContext'

export const Product = ({product}) => {
    const {title, thumbnail, price, original_price, marca, type, id} = product;

    // Modal
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // UseContext para obtener el state 
    const {addProductShoppingCart} = useContext(ProductContext);
    const {state:stateAuth,   addOrDeleteProductFavorite} = useContext(AuthContext);

    // History para hacer el logeo
    const history = useHistory()

    const [isFavorite, setIsFavorite] = useState(false);


    useEffect(() => {
        const favoriteProduct = stateAuth.favoritesProducts.find( itemProduct => itemProduct.id === product.id);
        if (!favoriteProduct) {
            setIsFavorite(true)
        }else{
            setIsFavorite(false)
        }
    }, [stateAuth.favoritesProducts])

    // Funcion para agregar al carrito de compras.
    const handleAddProduct  = () => {
        addProductShoppingCart(product); 
    }

    // Funcion para agregar productos favoritos.
    const handleAddOrDeleteFavoriteProduct  = () => {
        if (stateAuth.uid) {
            addOrDeleteProductFavorite(product);
        }else{
            Swal.fire({
                title: 'Logueate!!',
                icon: 'warning',
                text: 'Debes loguearte para guardar tus productos favoritos!',
                showDenyButton: true,
                confirmButtonText: 'Login',
                denyButtonText: `Cancel`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    history.push("/login")
                }
              })    
        }
    }

    return (
        <>
            <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-4 animate__animated animate__fadeIn cursor-pointer">
                <div className="flex flex-col ">
                
                    <div className="relative h-62 w-full mb-3">
                        <div className="absolute flex flex-col top-0 left-0">
                            {
                                isFavorite 
                                ?
                                <BiHeart 
                                    className = "w-full h-8 animate__animated"
                                    onClick = {handleAddOrDeleteFavoriteProduct}
                                />
                                :
                                <BsHeartFill 
                                    className = "w-full h-7 text-red-600 animate__animated animate__bounceIn"
                                    onClick = {handleAddOrDeleteFavoriteProduct}
                                />
                            }
                        </div>
                        {
                            (original_price) &&
                                <div className="absolute top-0 right-0 bg-red-500 text-white rounded-tr-md rounded-tl-3xl rounded-br-3xl p-2">
                                    {(100 - price*100/original_price).toFixed(0) } %
                                </div>
                        }
                        <Link to = {`/products/${type}/${id}`}>
                            <div className = "h-52">
                                <img src= {thumbnail} alt="Just a flower" className=" w-full  object-contain  rounded-2xl h-full"/>
                            </div>
                        </Link>
                    </div>
                    <div className="flex-auto justify-evenly">
                    <div className="flex flex-wrap ">
                        <div className="w-full flex-none text-sm flex items-center text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-gray-400 whitespace-nowrap mr-3">4.60</span><span className="mr-2 text-gray-400">{marca}</span>
                            </div>
                            <div className="flex items-center w-full justify-between min-w-0 h-28">
                                <h2 className="text-lg mr-auto cursor-pointer text-black hover:text-purple-500">{title}</h2>
                                <p className="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                    INSTOCK</p>
                            </div>
                    </div>
                    <div className="text-xl text-black font-semibold my-2">S/. {price}</div>
                    <div className="flex space-x-2 text-sm font-medium justify-start">
                        <button 
                            className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 "
                            onClick = {handleAddProduct}
                        >
                            <span>Add Cart</span>
                        </button>
                        <button 
                            className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2"
                            onClick={toggleModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                    </div>
                </div>
                {
                    isOpen &&
                    <div className = "w-screen h-screen bg-black fixed top-0 left-0 flex justify-center items-center bg-opacity-70 z-10">
                        <div className = "w-1/3 h-1/3 animate__animated animate__bounceIn relative bg-white" >
                            <img src={thumbnail} alt="" className = "object-contain" />
                        </div>
                    </div>
                }
                <div></div>
            </div>
        </>
        
    )
}
