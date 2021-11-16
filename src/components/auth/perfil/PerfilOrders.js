import React, { useContext } from 'react'
import {FaClipboardList} from 'react-icons/fa'
import AuthContext from '../../../context/auth/AuthContext'
import ModalContext from '../../../context/modal/ModalContext';

export const PerfilOrders = () => {

    const {state:stateAuth, setActiveOrder} = useContext(AuthContext);
    const {changeStateModalOrder} = useContext(ModalContext);

    return (
        <>
        <div className="w-full bg-grey-lightest col-span-3 animate__animated animate__fadeInRight">
            <div className="container mx-auto">
                <div className="mx-auto bg-white rounded shadow-lg border p-7">
                    <h3 className = "text-2xl font-bold"> Mis compras realizadas</h3>
                    <p className = "my-4">Aquí podrás encontrar los estados de todas tus compras.</p>

                    {
                        stateAuth.orders.length > 0 
                        ? 
                        <div className="flex flex-col">
                            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                                <div className="py-2 sm:px-6 lg:px-8">
                                    <div className="shadow border-b border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col"className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Id Orden</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Fecha</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    stateAuth.orders.map((order) => {
                                                        return (
                                                            <tr 
                                                                key={order.idOrder} 
                                                                className = "cursor-pointer transform transition-all ease-in duration-300 hover:scale-105"
                                                                onClick = {() => {
                                                                    setActiveOrder(order);
                                                                    changeStateModalOrder(true);
                                                                }}
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="flex items-center">
                                                                        <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900">{order.idOrder}</div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-900">{order.date}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">S/. {order.total}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        :
                        <div className = "h-96 flex flex-col justify-between">
                            <div className = "text-center flex flex-col flex-grow justify-center items-center animate__animated animate__bounceIn">
                                <FaClipboardList className = "text-8xl text-purple-600 mx-auto mb-4"></FaClipboardList>
                                <p className = "w-1/2 text-purple-600 font-bold mb-4">Aun no tienes compras realizadas :c</p>
                                <button></button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        
        </>
    )
}
