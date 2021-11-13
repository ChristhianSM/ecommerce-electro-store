import React, { useContext, useEffect, useState } from 'react'
import {BsFillCartXFill} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import ProductContext from '../../context/product/ProductContext';
import { getTotalAmount } from '../../helpers/functions';
import { ShoppingCartProduct } from './ShoppingCartProduct';

export const ShoppingCartWindow = ({setModal, modal}) => {
    const {state:{shoppingCart}} = useContext(ProductContext);

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const total = getTotalAmount(shoppingCart);
        setTotalAmount(total);
    }, [shoppingCart])
    return (
        <>
            {
                shoppingCart.length > 0 ?
                <>
                    <ul className="flex flex-col flex-grow">
                        {
                            shoppingCart.map( product =>{
                                return(
                                    <ShoppingCartProduct 
                                        key = {product.id}
                                        product = {product}
                                    />
                                )
                            })
                        }      
                    </ul>
                    <div className="space-y-1 text-right flex justify-between items-center border-t border-b border-gray-300 py-2">
                        <p className = "text-purple-600 font-bold">Total productos:</p>
                        <p className="font-semibold">S./ {totalAmount}</p>
                    </div> 
                    <div className="flex justify-between space-x-4">
                        <button 
                            type="button" 
                            className="px-6 py-2 border rounded-md border-purple-600 text-purple-600 hover:bg-purple-700 hover:text-white"
                            onClick = {() => {
                                setModal(!modal)
                            }}
                        >Volver 
                            <span className="sr-only sm:not-sr-only">a la tienda</span>
                        </button>
                        <Link to = "/shoppingCart" className = "flex items-center"> 
                            <button type="button" className="px-6 py-2 border rounded-md bg-purple-600 text-coolGray-50 border-purple-600 text-white hover:bg-purple-700">
                                <span className="sr-only sm:not-sr-only">Continuar con </span>la compra
                            </button>
                        </Link>
                    </div>
                </>
                :
                <div className = "h-screen flex flex-col justify-between">
                    <div className = "text-center flex flex-col flex-grow justify-center items-center animate__animated animate__bounceIn">
                        <BsFillCartXFill className = "text-8xl text-purple-600 mx-auto"></BsFillCartXFill>
                        <p className = "font-bold mt-3 text-base text-purple-600">Tu carrito de compras esta vacio :C</p>
                    </div>
                    <button 
                        className="px-6 py-2 border rounded-md bg-purple-600 text-white absolute bottom-6 w-full" 
                        onClick = {() => {
                            setModal(!modal)
                        }}
                    >Cerrar</button>
                </div> 
            }
        </>
    )
}
