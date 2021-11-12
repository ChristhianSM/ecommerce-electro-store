import React, { useContext, useEffect } from 'react'
import * as dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import ProductContext from '../../../context/product/ProductContext'
import { v4 as uuidv4 } from 'uuid';
import AuthContext from '../../../context/auth/AuthContext';
import PaymentContext from '../../../context/payment/PaymentContext';

export const ModalConfirmation = () => {

    const {saveOrder} = useContext(AuthContext);
    const {state: statePayment} = useContext(PaymentContext);
    const {state:stateProduct,clearShoppingCart } = useContext(ProductContext);

    const {total, typeShipping, subtotal, couponDiscount} = statePayment;

    const idOrder = uuidv4();
    let date = new Date();
    date = dayjs(date).format('DD/MM/YYYY   HH:mm:ss')

    const order = {
        idOrder,
        products: stateProduct.shoppingCart,
        total,
        subtotal,
        typeShipping,
        date,
        couponDiscount
    }
    useEffect(() => {
        saveOrder(order);
    }, [])
    return (
        <>
            <div className = "w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-20 flex items-center justify-center p-16">
                <div className = "w-2/6 h-2/3 bg-white relative rounded-xl p-16 text-black text-center animate__animated animate__fadeIn">
                    <h1 className = "font-semibold text-3xl text-purple-500 pb-4 mb-5 border-b border-gray-400">Compra Registrada con exito</h1>
                    <div className = "text-xl border-b border-gray-400">
                        <p>Tu compra finalizo con exito y en unos instantes recibiras un correo electronico con el detalle de la misma, tu pedido fue registrado con el identificador</p>
                        <p className = "my-5 bg-gray-500 w-4/5 mx-auto p-2 rounded-xl text-white font-semibold text-xl">{idOrder}</p>
                        <p>Mas adelante podras consultar tus ordenes en la seccion Mi cuenta - Mis ordenes</p>
                        <p className = "my-5">¡Muchas gracias por tu compra!</p>
                    </div>
                    <div className = "flex justify-end">
                        <Link to= "/">
                            <button 
                                className = "bg-purple-500 text-white p-2 px-5 mt-5 rounded-xl uppercase text-lg hover:bg-purple-600"
                                onClick = { () =>{ 
                                    clearShoppingCart();
                                }}
                            >
                                    Seguir
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
