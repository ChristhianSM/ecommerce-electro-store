import React, { useContext } from 'react'
import {MdFavoriteBorder} from 'react-icons/md'
import {GrTrash} from 'react-icons/gr'
import ProductContext from '../../context/product/ProductContext';
import AuthContext from '../../context/auth/AuthContext';

export const ShoppingCartProduct = ({product}) => {

    const {removeProductShoppingCart} = useContext(ProductContext);
    const {addOrDeleteProductFavorite} = useContext(AuthContext);

    return (
        <li className="flex flex-col py-1 px-1 sm:flex-row sm:justify-between border border-gray-200 rounded-md mb-2 animate__animated animate__zoomIn">
            <div className="flex w-full space-x-2 sm:space-x-4">
                <img className="flex-shrink-0 object-contain border-transparent rounded outline-none sm:w-28 sm:h-28 bg-coolGray-500" src={product.thumbnail} alt={product.title} />
                <div className="flex flex-col justify-center w-full">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold leading-snug sm:pr-8">{product.title}</h3>
                            <p className="text-xs text-coolGray-600">{product.marca}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-base font-semibold">S/.{product.price}</p>
                            <p className="text-xs line-through text-coolGray-400">S/.{product.original_price}</p>
                        </div>
                    </div>
                    <div className="flex text-sm divide-x">
                        <button 
                            type="button" 
                            className="flex items-center px-2 py-1 pl-0 space-x-1 hover:text-red-600"
                            onClick = {() => {
                                removeProductShoppingCart(product.id)
                            }}
                        >
                            <GrTrash className = "text-base"></GrTrash>
                            
                            <span>Remove</span>
                        </button>
                        <button 
                            type="button" 
                            className="flex items-center px-2 py-1 space-x-1 hover:text-green-600"
                            onClick = {() => {
                                addOrDeleteProductFavorite(product)
                            }}
                        >
                            <MdFavoriteBorder></MdFavoriteBorder>
                            <span>Add to favorites</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}
