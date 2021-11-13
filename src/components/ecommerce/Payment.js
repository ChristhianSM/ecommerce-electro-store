import React, { useContext, useEffect, useState } from 'react'
import {BsTruck} from 'react-icons/bs'
import {IoStorefrontOutline} from 'react-icons/io5'
import PaymentContext from '../../context/payment/PaymentContext'
import { FormPayment } from './FormPayment'

export const Payment = ({shoppingCart,total, statePasos, setStatePasos , setStateComponent ,stateComponent}) => {
    const {state:statePayment, changeEnvio, getTotalWhithDiscount} = useContext(PaymentContext);

    const [inputRadioEnvio, setInputRadioEnvio] = useState("tienda");

    useEffect(() => {
        getTotalWhithDiscount("tienda");
    }, [])

    const handleInputRadioEnvio = (e) => {
        setInputRadioEnvio(e.target.value);
        if (e.target.value === "tienda") {
            getTotalWhithDiscount("tienda");
        }else{
            getTotalWhithDiscount("domicilio");
        }
        changeEnvio(e.target.value)
    }

    return (
        <div className="flex my-10 gap-2 justify-center">
            <div className = "w-5/12  px-5 py-10 bg-gray-200">
                <h3 className = "text-2xl mb-5 font-semibold">Resumen de la compra</h3>
                {
                    shoppingCart.map(product => {
                        return(
                            <div 
                                className="bg-white flex gap-2 p-2 mb-3 items-center animate__animated animate__fadeInUp" 
                                key = {product.id}
                            >
                                <img src={product.thumbnail} alt="" className = "w-20 h-20 object-contain"/>
                                <p className = "w-2/5 mx-6">{product.title}</p>
                                <p className = "w-1/5">x{product.amount}</p>
                                <p className = "w-1/5">S/. {product.price}</p>
                            </div>
                        )
                    })
                }
                <div className = "border-b border-gray-300">
                    <div className = "flex justify-between items-center">
                        <p className = "ml-5 font-bold text-base">Subtotal : </p>
                        <p className = "mr-5 text-lg font-bold">S/. {statePayment.subtotal}</p>
                    </div>
                    {
                        statePayment.couponDiscount !== 0 &&
                        <div className = "flex justify-between items-center">
                            <p className = "ml-5 font-bold text-base">Descuento por cupon : </p>
                            <p className = "mr-5 text-lg font-bold">S/. {statePayment.couponDiscount}</p>
                        </div>
                    }
                    {
                        statePayment.typeShipping === "domicilio" &&
                        <div className = "flex justify-between items-center animate__animated animate__zoomIn">
                            <p className = "ml-5 font-bold text-base">Envio a domicilio : </p>
                            <p className = "mr-5 text-lg font-bold">S/. 30</p>
                        </div>
                    }
                </div>

                <div className = "flex justify-between items-center">
                    <p className = "ml-5 font-bold text-base">Total : </p>
                    <p className = "mr-5 text-lg font-bold animate__animated animate__fadeInUp">S/. 
                        {statePayment.total !== 0 ? statePayment.total : statePayment.subtotal}
                    </p>
                </div>
                <h3 className = "text-2xl my-5 font-semibold">Envio</h3>
                <div className="bg-white p-2 mb-3">
                    <form action="">
                        <div className = " flex items-center cursor-pointer border-b border-gray-300">
                            <input 
                                type="radio" 
                                name="envio" 
                                id="tienda"  
                                className = "w-20"
                                onChange = {handleInputRadioEnvio} 
                                value = "tienda"
                                checked = {inputRadioEnvio === "tienda" ? true : false}
                            />
                            <label htmlFor="tienda" className = "flex justify-between flex-grow cursor-pointer py-5">
                                <div className = "flex items-center">
                                    <IoStorefrontOutline className = "text-4xl mr-4 text-purple-500"></IoStorefrontOutline>
                                    Despacho en tienda
                                </div>
                                <p className = "text-right flex-grow text-2xl font-bold mr-5">Gratis</p>
                            </label>
                        </div>
                        <div className = " flex items-center cursor-pointer">
                            <input 
                                type="radio" 
                                name="envio" 
                                id="domicilio" 
                                className = "w-20"
                                onChange = {handleInputRadioEnvio}
                                checked = {inputRadioEnvio === "domicilio" ? true : false}
                                value = "domicilio"
                            />
                            <label htmlFor="domicilio" className = "flex justify-between flex-grow cursor-pointer py-5">
                                <div className = "flex items-center">
                                    <BsTruck className = "text-4xl mr-4 text-purple-500"></BsTruck>
                                    Envio a domicilio
                                </div>
                                <p className = "text-right flex-grow text-2xl font-bold mr-5">S/. 30.00</p>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            <div className = "w-6/12 px-10 py-10 bg-gray-200">
                <h3 className = "text-2xl mb-5 font-semibold">Datos de facturacion</h3>

                <FormPayment 
                    setStatePasos = {setStatePasos}
                    setStateComponent = {setStateComponent}
                />

                
            </div>
        </div>
    )
}
