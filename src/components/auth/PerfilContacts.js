import React from 'react'
import {BsWhatsapp} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import {ImHeadphones} from 'react-icons/im'

export const PerfilContacts = () => {
    return (
        <div className="w-full bg-grey-lightest col-span-3 animate__animated animate__fadeInRight">
            <div className="container mx-auto">
                <div className="mx-auto bg-white rounded shadow-lg border px-32 items-center flex-col py-10">
                    <div>
                        <h3 className = "font-semibold text-2xl mb-3">Contactanos</h3>
                        <p className = "mb-8">Aquí encontrarás nuestros canales de atención.</p>
                    </div>
                    <div className = "flex items-center border border-gray-500 rounded-lg  p-5 mb-3">
                        <BsWhatsapp className = "w-20 text-4xl text-purple-500"></BsWhatsapp>
                        <div>
                            <p className = "text-xl font-semibold">WhatsApp: 959 686 193</p>
                            <p>Conversemos, estamos en línea.</p>
                        </div>
                    </div>
                    <div className = "flex items-center border border-gray-500 rounded-lg p-5 mb-3">
                        <ImHeadphones className = "w-20 text-4xl text-purple-500"></ImHeadphones>
                        <div>
                            <p className = "text-xl font-semibold">Call Center: (01) 611-5959</p>
                            <p>Llámanos de lunes a domingo de 9am a 9pm.</p>
                        </div>
                    </div>
                    <div className = "flex items-center border border-gray-500 rounded-lg  p-5 mb-3">
                        <MdEmail className = "w-20 text-4xl text-purple-500"></MdEmail>
                        <div>
                            <p className = "text-xl font-semibold">Correo: consultas@christhian.com.pe</p>
                            <p>Escríbenos, estamos atentos a tus consultas.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
