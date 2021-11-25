import React, { useContext, useEffect, useState } from 'react'
import { BsHandbag, BsFillCheckCircleFill} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md';
import { NavBar } from '../../ui/NavBar'
import ProductContext from '../../../context/product/ProductContext'
import { ShoppingCart } from './ShoppingCart';
import { Payment } from './Payment';
import { Confirmation } from './Confirmation';
import { getTotalAmount } from '../../../helpers/functions';
import PaymentContext from '../../../context/payment/PaymentContext';

export const ShoppingCartScreen = () => {
    
    const {state:stateProduct} = useContext(ProductContext);
    const {setDataPayment} = useContext(PaymentContext);
    
    const [total, setTotal] = useState(0);
    useEffect(() => {
        setTotal(getTotalAmount(stateProduct.shoppingCart));
        setDataPayment(getTotalAmount(stateProduct.shoppingCart));
    }, [stateProduct.shoppingCart])

    // UseState para los pasos de pago 
    const [statePasos, setStatePasos] = useState({
        shoppingCart : true,
        payment : false,
        confirmation: false,
    })

    // Estado para cambiar de componentes
    const [stateComponent, setStateComponent] = useState({
        componentShoppingCart : true,
        componentPayment : false,
        componentConfirmation: false,
    })
   
    return (
        <div>
            <NavBar />
            <div className="container mx-auto max-w-7xl mt-60">
                <div className="p-5">
                    <div className="mx-4 p-4">
                        <div className="flex items-center">
                            <div className="flex items-center text-gray-500 relative">
                                <div 
                                    className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-500 flex justify-center items-center ${statePasos.shoppingCart &&"bg-purple-500 text-white border-purple-500"}`}
                                >
                                    <BsHandbag className = "text-2xl"></BsHandbag>
                                </div>
                                <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-purple-500"> Carrito de compras</div>
                            </div>
                            <div 
                                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${statePasos.payment && "border-purple-600"}`}
                            ></div>
                            <div className="flex items-center text-gray-500 relative">
                                <div 
                                    className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-500 flex justify-center items-center ${statePasos.payment && "bg-purple-500 text-white border-purple-500"}`}
                                >
                                    <MdPayment className = "text-2xl"></MdPayment>
                                </div>
                                <div className=" absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-purple-500">Pagó</div>
                            </div>
                            <div
                                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${statePasos.confirmation && "border-purple-600"}`} 
                            ></div>
                            <div className="flex items-center text-gray-500 relative">
                                <div 
                                    className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-500 flex justify-center items-center ${statePasos.confirmation &&"bg-purple-500 text-white border-purple-500"}`}
                                >
                                    <BsFillCheckCircleFill className = "text-2xl"></BsFillCheckCircleFill>
                                </div>
                                <div className=" absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-purple-500">Confirmacion</div>
                            </div>
                        </div>
                    </div>
                    {
                        stateComponent.componentShoppingCart && 
                        <ShoppingCart 
                            shoppingCart = {stateProduct.shoppingCart}
                            total = {total}
                            statePasos = {statePasos}
                            setStatePasos = {setStatePasos}
                            setStateComponent = {setStateComponent}
                            stateComponent = {stateComponent}
                        />
                    }

                    {
                        stateComponent.componentPayment && 
                        <Payment
                            shoppingCart = {stateProduct.shoppingCart}
                            total = {total}
                            statePasos = {statePasos}
                            setStatePasos = {setStatePasos}
                            setStateComponent = {setStateComponent}
                        />
                    }

                    {
                        stateComponent.componentConfirmation && 
                        <Confirmation
                            shoppingCart = {stateProduct.shoppingCart}
                            total = {total}
                        />
                    }
                </div>  
            </div>
        </div>
    )
}
