import React, { useContext, useState } from 'react'
import {AiFillLock} from 'react-icons/ai'
import PaymentContext from '../../context/payment/PaymentContext'
import { ModalConfirmation } from '../ui/modals/ModalConfirmation';

export const Confirmation = ({shoppingCart,total}) => {

    const {state:statePayment} = useContext(PaymentContext);

     // Modal
     const [isOpen, setIsOpen] = useState(false);

     function toggleModal() {
         setIsOpen(!isOpen);
     }
 
    return (
        <div className="flex my-10 gap-2 justify-center">
            <div className = "w-7/12  px-5 py-10 bg-gray-100 animate__animated animate__fadeInLeft">
                <div className = "text-center">
                    <h3 className = "text-2xl font-semibold mb-4">Estas a punto de finalizar tu compra</h3>
                    <p className = "text-sm border-dashed border-2 border-yellow-300 bg-yellow-100 py-2">Recuerda revisar que los datos de despacho y montos estén correctos antes de presionar comprar.</p>
                </div>
                <div className = "grid grid-cols-2 mt-5 ">
                    <div className = "mb-2 ">
                        <h3 className = "text-lg font-semibold mb-4">Despacho</h3>
                        <div className = "mb-3">
                            <p className = "font-semibold text-purple-500">
                                Lugar : {statePayment.typeShipping === "tienda"? 'Tienda ElectroStore' : "Reparto a domicilio"}</p>
                            <p>
                                {statePayment.typeShipping === "domicilio"? statePayment.dataFacturation.address : "Av Sánchez Cerro 234"} 
                                </p>
                        </div>
                        <div className = "mb-3">
                            <p className = "font-semibold text-purple-500">Fecha estimada</p>
                            <p>6 de Noviembre 2021</p>
                        </div>
                        <div className = "mb-3">
                            <p className = "font-semibold text-purple-500">Horario de atencion</p>
                            <p>Lun a Dom 09:00 a 21:00 hrs</p>
                        </div>
                    </div>
                    <div className = "">
                        <h3 className = "text-lg font-semibold mb-4">Pago</h3>
                        <div className = "mb-3">
                            <p className = "font-semibold text-purple-500">Comprobante de pago</p>
                            <p>Boleta</p>
                        </div>
                        <div className = "mb-3">
                            <p className = "font-semibold text-purple-500">Email destino del comprobante de pago</p>
                            <p>{statePayment.dataFacturation.email}</p>
                        </div>
                        <div className = "mb-3">
                            <p className = "font-semibold text-purple-500">Nombre del usuario</p>
                            <p>{statePayment.dataFacturation.name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "w-5/12 px-5 py-10 animate__animated animate__fadeInRight">
                <h3 className = "text-2xl mb-5 font-semibold">Resumen de la compra</h3>
                {
                    shoppingCart.map(product => {
                        return(
                            <div className="bg-white flex gap-2 p-2 items-center" key = {product.id}>
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
                        <p className = "ml-5 font-bold text-base">SubTotal : </p>
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
                {/* <div className = "flex justify-between items-center border-t border-gray-300 p-2">
                    <p className = "ml-5 font-bold text-lg">Total : </p>
                    <p className = "mr-5 text-xl font-bold">S/. {total}</p>
                </div> */}
                <button className = "mt-6 w-full border flex gap-2 items-center border-purple-500 p-3 rounded-lg text-white font-semibold bg-purple-500 hover:bg-purple-600 justify-center"
                    onClick = { () => {
                        setIsOpen(true);
                    }}
                >
                    <AiFillLock></AiFillLock>
                    Confirmar y comprar
                </button>
            </div>
            
            {
                isOpen && <ModalConfirmation />
            }
        </div>
    )
}
