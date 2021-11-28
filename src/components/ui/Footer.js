import React from 'react'
import {BsShop} from 'react-icons/bs'
import {FaRegComments, FaFacebook, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'
import {AiOutlineDropbox} from 'react-icons/ai'
import {VscBook} from 'react-icons/vsc'

export const Footer = () => {
    return (
        <>
            <div className = "bg-purple-500 mt-10">
                <div className = "max-w-7xl mx-auto flex gap-5 justify-between py-4 text-white text-center">
                    <div>
                        <BsShop className = "text-5xl mx-auto" ></BsShop>
                        <p className = "font-semibold text-lg my-1">Retiro en tienda</p>
                        <p>Ubicacion en Jron H-260 Urbanizacion San Jose</p>
                    </div>
                    <div>
                        <FaRegComments className = "text-5xl mx-auto"></FaRegComments>
                        <p className = "font-semibold text-lg my-1">Atencion al Cliente</p>
                        <p> (+51) 959686193</p>
                        <p> (073) 301402</p>
                    </div>
                    <div>
                        <AiOutlineDropbox className = "text-5xl mx-auto"></AiOutlineDropbox>
                        <p className = "font-semibold text-lg my-1">Devolución</p>
                        <p>Cambios y devoluciones</p>
                    </div>
                    <div>
                        <VscBook className = "text-5xl mx-auto"></VscBook>
                        <p className = "font-semibold text-lg my-1">Libro de reclamaciones</p>
                        <p>Nos interesa saber tu opinión</p>
                    </div>
                </div>
            </div>
            <div className="bg-gray-800 flex p-5 px-16 text-center text-white">
                <div className = "w-1/6">
                    <p className = "mb-4">
                        <span className ="font-bold text-lg">ElectroStore</span> es mucho mas que una tienda de productos electronicos</p>
                    <p className ="font-bold">Visitanos de :</p>
                    <p>Lunes a viernes de 8:00 am a 9:00 pm</p>
                    <p>Sabados y domingos de 9:00 am a 6:00 pm</p>
                </div>
                <div className = "w-4/6">

                </div>
                <div className = "w-1/6">
                    <p className = "font-bold text-lg">Siguenos en nuestras redes sociales:</p>
                    <div className = "mt-5 flex justify-between">
                        <a href="https://www.facebook.com/sagitario142/" className = "cursor-pointer" target = "_blank">
                            <FaFacebook className = "text-4xl"></FaFacebook>
                        </a>
                        <a href="https://www.facebook.com/sagitario142/" className = "cursor-pointer" target = "_blank">
                            <FaInstagram className = "text-4xl cursor-pointer"></FaInstagram>
                        </a>
                        <a href="https://www.facebook.com/sagitario142/" className = "cursor-pointer" target = "_blank">
                            <FaLinkedin className = "text-4xl cursor-pointer"></FaLinkedin>
                        </a>
                        <a href="https://www.facebook.com/sagitario142/" className = "cursor-pointer" target = "_blank">
                            <FaYoutube className = "text-4xl cursor-pointer"></FaYoutube>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
/*  */