import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {BsFillCartXFill} from 'react-icons/bs'
import {IoTicketOutline} from 'react-icons/io5'
import {MdFavoriteBorder} from 'react-icons/md'
import {GrTrash} from 'react-icons/gr'
import PaymentContext from '../../context/payment/PaymentContext';
import ProductContext from '../../context/product/ProductContext';
import AuthContext from '../../context/auth/AuthContext';
import { SpinnerCircularFixed } from 'spinners-react';

export const ShoppingCart = ({shoppingCart, statePasos, setStatePasos , setStateComponent }) => {
    const {state:statePayment, applyCouponDiscount, resetPayment} = useContext(PaymentContext);

    const {removeProductShoppingCart} = useContext(ProductContext);
    const {addOrDeleteProductFavorite} = useContext(AuthContext);

    // Para simular spinner

    useEffect(() => {
        resetPayment();
    }, [])

    const [code, setCode] = useState("");
    const handleCode = (e) => {
        setCode(e.target.value)
    }

    const handleContinue = () => {
        if (statePayment.couponDiscount === 0) {
            applyCouponDiscount('', statePayment.subtotal);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        applyCouponDiscount(code, statePayment.subtotal);
    }

    return (
        <div className="flex my-10">
            <div className="w-3/4 bg-white px-10 py-10 animate__animated animate__zoomIn">
                <div className="flex justify-between border-b pb-2">
                    <h1 className="font-semibold text-2xl">Mi carrito de compras</h1>
                    <h2 className="font-semibold text-2xl">
                        {
                            shoppingCart.length === 0 
                            ? "" 
                            : shoppingCart.length === 1 
                            ? `${shoppingCart.length} Product`
                            : `${shoppingCart.length} Products`  
                        } 
                    </h2>
                </div>
            
                {/* Products */}
                {
                    shoppingCart.length > 0 
                    ?
                    <>
                        <div className="flex mt-10 mb-5">
                            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalles del producto</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Cantidad</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Precio</h3>
                            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Total</h3>
                        </div>
                        {
                            shoppingCart.map( product => {
                                return (
                                    <div className = "flex mb-8 items-center animate__animated animate__zoomIn" key = {product.id}>
                                        <div className="w-2/5 flex gap-3">
                                            <img src={product.thumbnail} alt="" className = "object-contain h-24" />
                                            <div>
                                                <p>{product.title}</p>  
                                                <div className = "flex gap-3 mt-3">
                                                    <button 
                                                        type="button" 
                                                        className="flex items-center px-2 py-1 pl-0 space-x-1 hover:text-red-600"
                                                        onClick = {() => {
                                                            removeProductShoppingCart(product.id)
                                                        }}
                                                    >
                                                        <GrTrash className = "text-base"></GrTrash>
                                                        
                                                        <span>Quitar</span>
                                                    </button>
                                                    <button 
                                                        type="button" 
                                                        className="flex items-center py-1 space-x-1 hover:text-green-600"
                                                        onClick = {() => {
                                                            addOrDeleteProductFavorite(product)
                                                        }}
                                                    >
                                                        <MdFavoriteBorder></MdFavoriteBorder>
                                                        <span>Agregar a favoritos</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/5 text-center">
                                            <p>x {product.amount}</p>
                                        </div>
                                        <div className="w-1/5 text-center">
                                            <p>S/. {product.price}</p>
                                        </div>
                                        <div className="w-1/5 text-center">
                                            <p>S/. {product.price*product.amount}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                    : 
                    <div className = "h-72 flex flex-col justify-between">
                        <div className = "text-center flex flex-col flex-grow justify-center items-center animate__animated animate__bounceIn">
                            <BsFillCartXFill className = "text-8xl text-purple-600 mx-auto"></BsFillCartXFill>
                            <p className = "font-bold mt-3 text-base text-purple-600">Tu carrito de compras esta vacio :C</p>
                        </div>
                    </div> 
                }

                <Link to = "/">
                    <button className="flex font-semibold text-indigo-600 text-sm mt-5 items-center">
                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"/></svg>
                        Continuar Comprando
                    </button>
                </Link>
            </div>

            <div id="summary" className="w-1/4 px-8 py-10 bg-gray-100">
                <h3 className="font-semibold text-2xl border-b pb-2">Cupones y descuentos</h3>
                <div className="py-5 flex gap-1 items-center">
                    <IoTicketOutline className = "text-4xl"></IoTicketOutline>
                    <div className = "relative w-full">
                        <form action="" onSubmit = {handleSubmit}>
                            <input 
                                type="text" 
                                id="promo" 
                                placeholder="Ingresa tu codigo" 
                                className="p-2 pr-20 text-sm w-full outline-none border border-gray-400 rounded-lg"
                                onChange = {handleCode}
                                value = {code}
                            />
                            <button 
                                className = "absolute top-0 right-0 border border-purple-600 h-full px-3 rounded-tr-lg rounded-br-lg text-purple-600 hover:bg-purple-500 hover:text-white"
                                type = "submit"
                            >Aplicar</button>
                        </form>
                    </div>
                </div>
                <SpinnerCircularFixed 
                    size={50} thickness={100} speed={100} color="rgba(120, 57, 172, 1)" 
                    secondaryColor="rgba(0, 0, 0, 0.44)" 
                    className = "mx-auto"
                    enabled = {statePayment.loading}
                />
                <div className="mt-2">
                    <h3 className="font-semibold text-2xl pb-2">Resumen</h3>
                    <div className="flex justify-between mt-10 mb-3">
                       <span className="font-semibold text-sm"> Subtotal</span>
                        <span className="font-semibold text-sm">S/. {statePayment.subtotal}</span>
                    </div>
                    {
                        statePayment.couponDiscount !== 0  &&
                        <div className="flex justify-between mb-3 animate__animated animate__zoomIn">
                            <span className="font-semibold text-sm"> Descuento por cupon</span>
                            <span className="font-semibold text-sm">S/. {statePayment.couponDiscount}</span>     
                        </div> 
                    } 
                </div>
                <div className="border-t mt-2">
                    <div className="flex font-bold justify-between py-4 text-sm">
                        <span>Total normal</span>
                        {
                            statePayment.total 
                            ? <span>S/. {statePayment.total}</span>
                            : <span>S/. {statePayment.subtotal}</span>
                        }
                    </div>

                    <button 
                        className={`bg-purple-500 font-semibold hover:bg-purple-600 py-3 text-sm text-white uppercase w-full rounded-lg ${statePayment.loading && 'bg-gray-500 cursor-not-allowed'}`}
                        disabled = {statePayment.loading}
                        onClick = {() => {
                            setStatePasos({
                                ...statePasos,
                                payment : true,
                            })
                            setStateComponent({
                                componentShoppingCart : false,
                                componentPayment : true,
                                componentConfirmation : false,
                            })

                            handleContinue();
                        }}
                    >Continuar</button>
                </div>
            </div>
        </div>
    )
}
