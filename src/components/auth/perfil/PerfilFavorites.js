import React, { useContext } from 'react'
import { BsTrash } from 'react-icons/bs';
import {IoHeartDislikeOutline} from 'react-icons/io5'
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import AuthContext from '../../../context/auth/AuthContext';
import ProductContext from '../../../context/product/ProductContext';

export const PerfilFavorites = ({favoritesProducts}) => {

    const {addOrDeleteProductFavorite} = useContext(AuthContext);
    const {addProductShoppingCart} = useContext(ProductContext);

    const handleRemoveFavoriteProduct = (product) => {
        addOrDeleteProductFavorite(product);
    }

    const handleAddProductShoppingCart = (product) => {
        addProductShoppingCart(product);
    }

    return (
        <div className="w-full bg-grey-lightest col-span-3 animate__animated animate__fadeInRight">
            <div className="container mx-auto">
                <div className="mx-auto bg-white rounded shadow-lg border">
                    {
                        favoritesProducts.length > 0 
                        ?
                        favoritesProducts.map( product => {
                            return (
                                <div className="flex border rounded-xl m-2 items-center px-6 py-5 animate__animated animate__fadeIn" key = {product.id}>
                                    <div className="flex w-3/5"> 
                                        <div className="w-44">
                                            <img className="h-24 w-full object-contain" src={product.thumbnail} alt="" />
                                        </div>
                                        <div className="flex flex-col justify-center ml-4 flex-grow">
                                            <span className="font-bold text-sm">{product.title}</span>
                                            <span className="text-red-500 text-xs">{product.marca}</span>
                                        </div>
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm">S./ {product.price}</span>

                                    <div className = "w-1/5 flex gap-4">
                                        <button 
                                            className="font-semibold mr-3 flex items-center gap-1 hover:text-red-500 text-gray-500 text-sm"
                                            onClick = {() => {
                                                handleRemoveFavoriteProduct(product)
                                            }}
                                        >
                                            <BsTrash></BsTrash>
                                            Eliminar
                                        </button>
                                        <button 
                                            className="font-semibold hover:text-green-500 text-gray-500 text-sm flex items-center gap-1"
                                            onClick = {() => {
                                                handleAddProductShoppingCart(product)
                                            }}
                                        >
                                            <MdOutlineAddShoppingCart></MdOutlineAddShoppingCart>
                                            Agregar
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <div className = "h-96 flex flex-col justify-between">
                            <div className = "text-center flex flex-col flex-grow justify-center items-center animate__animated animate__bounceIn">
                                <IoHeartDislikeOutline className = "text-8xl text-purple-600 mx-auto mb-4"></IoHeartDislikeOutline>
                                <p className = "w-1/2 text-purple-600 font-bold mb-4">Tu lista de favoritos está vacía</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
