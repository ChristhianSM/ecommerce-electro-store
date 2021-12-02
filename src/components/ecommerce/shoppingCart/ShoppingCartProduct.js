import React, { useContext, useEffect, useState } from 'react'
import {MdFavorite, MdFavoriteBorder} from 'react-icons/md'
import {GrTrash} from 'react-icons/gr'
import {BsChevronDown,BsChevronUp} from 'react-icons/bs'
import ProductContext from '../../../context/product/ProductContext';
import AuthContext from '../../../context/auth/AuthContext';

export const ShoppingCartProduct = ({product}) => {
    
    // Estado de la aplicacion
    const { removeProductShoppingCart, updateAmountShoppingCart } = useContext(ProductContext);
    const { state:stateAuth, addOrDeleteProductFavorite } = useContext(AuthContext);

    // useState para modificar la cantidad de los productos
    const [amount, setAmount] = useState(product.amount);

    // Verificamos si el producto esta como favorito
    const [isFavorite, setIsFavorite] = useState(false);
    useEffect(() => {
        const favorite = stateAuth.favoritesProducts.find( favorite => favorite.id === product.id);
        if (favorite) {
            setIsFavorite(true);
        }else{
            setIsFavorite(false);
        }
    }, [stateAuth.favoritesProducts])

    const handleDecrementAmount = () => {
        if (amount > 1) {
            setAmount(amount-1);
            updateAmountShoppingCart(product.id, amount - 1);
        }
    }
    
    const handleIncrementAmount = () => {
        if (amount < product.stock) {
            setAmount(amount + 1);
            updateAmountShoppingCart(product.id, amount + 1);
        }
    }

    return (
        <li className="flex flex-col py-1 px-1 sm:flex-row sm:justify-between border border-gray-200 rounded-md mb-2 animate__animated animate__zoomIn">
            <div className="flex w-full space-x-2 sm:space-x-4">
                <div className = "flex flex-col justify-around items-center h-full ml-2">
                    <button onClick = {handleIncrementAmount} className = "transition p-1 rounded-full duration-500 ease-in-out  hover:bg-purple-600 hover:text-white transform hover:-translate-y-1 hover:scale-110">
                        <BsChevronUp></BsChevronUp>
                    </button>
                    <p> {amount} </p>
                    <button onClick = {handleDecrementAmount} className = "transition p-1 rounded-full duration-500 ease-in-out  hover:bg-purple-600 hover:text-white transform hover:-translate-y-1 hover:scale-110">
                        <BsChevronDown></BsChevronDown>
                    </button>
                </div>
                <img className="flex-shrink-0 object-contain border-transparent rounded outline-none sm:w-28 sm:h-28 bg-coolGray-500" src={product.thumbnail} alt={product.title} />
                <div className="flex flex-col justify-center w-full">
                    <div className="flex justify-between w-full pb-2 space-x-2">
                        <div className="space-y-1">
                            <h3 className="text-sm font-semibold leading-snug sm:pr-8">{product.title}</h3>
                            <p className="text-xs text-coolGray-600">{product.marca}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-base font-semibold">S/.{product.price}</p>
                            <p className="text-xs line-through text-coolGray-400">
                                {
                                    product.original_price && `S/.${product.original_price}`
                                } 
                            </p>
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
                            
                            <span>Eliminar</span>
                        </button>
                        <button 
                            type="button" 
                            className={`flex items-center px-2 py-1 space-x-1 hover:text-purple-600 ${isFavorite && "text-purple-400"}`}
                            onClick = {() => {
                                addOrDeleteProductFavorite(product)
                            }}
                        >   
                            {
                                isFavorite 
                                ? <MdFavorite className = "text-purple-500"></MdFavorite> 
                                : <MdFavoriteBorder></MdFavoriteBorder>
                            }
                            
                            <span>Agregar a favoritos</span>
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}
