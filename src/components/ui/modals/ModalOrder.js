import React from 'react'

export const ModalOrder = ({order, setIsOpen}) => {
    return (
        <>
             <div className = "w-screen h-full fixed top-0 left-0 bg-black bg-opacity-20 flex items-center justify-center p-16">
                <div className = "xl:w-2/6 md:3/6 bg-white relative rounded-xl p-10 text-black text-center animate__animated animate__fadeIn">
                    <div className = "border-b border-gray-300">
                        <h2 className = "text-3xl text-purple-500 font-semibold py-2">Resumen de tu orden</h2>
                    </div>
                    <div className = "my-5 border-b border-gray-300 pb-4">
                        <p className = "mb-2 text-xl font-bold">Id Orden : <span className = "font-normal">{order.idOrder}</span></p>
                        <p className = "mb-2 text-xl font-bold">Fecha de emision : <span className = "font-normal">{order.date}</span></p>
                        <p className = "mb-2 text-xl font-bold">Tipo de envio : <span className = "font-normal">{order.typeShipping}</span></p>
                    </div>
                    <div className = "border-b border-gray-300 pb-4">
                        {
                            order.products.map(product => {
                                return (
                                    <div key = {product.id} className = "bg-white flex gap-2 p-2 items-center animate__animated animate__fadeInUp">
                                       <img src={product.thumbnail} alt={product.title} className = "w-2/6 h-20 object-contain"/>
                                       <p className ="w-2/6"> {product.title}</p>
                                       <p className ="w-1/6">x {product.amount}</p>
                                       <p className ="w-1/6">S/. {product.price * product.amount}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className = "flex justify-between items-center font-bold text-xl border-b border-gray-300 pb-3">
                        <p className = "mt-3">Total en productos : </p>
                        <p className = "mt-3">S/. {order.subtotal}</p>
                    </div>
                    <div className = "flex justify-between items-center font-bold text-xl border-b border-gray-300 pb-3">
                        <p className = "mt-3">Descuento por cupon Aplicado : </p>
                        <p className = "mt-3">{order.couponDiscount !== 0?  `S/. ${order.couponDiscount}` : "S/ 0.00"}</p>
                    </div>
                    <div className = "flex justify-between items-center font-bold text-xl border-b border-gray-300 pb-3">
                        <p className = "mt-3">Gastos de envio : </p>
                        <p className = "mt-3">{order.typeShipping === "domicilio"? "S/. 30.00" : "S/ 0.00"}</p>
                    </div>
                    <div className = "flex justify-between items-center font-bold text-xl border-b border-gray-300 pb-3">
                        <p className = "mt-3">Total Pagado: </p>
                        <p className = "mt-3">S/. {order.total}</p>
                    </div>
                    <div className = "flex justify-end items-center font-bold text-2xl mt-4">
                        <button 
                            className ="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                            onClick = { () => setIsOpen(false)}
                        >Salir</button>
                    </div>
                </div>
            </div>
        </>
    )
}
