import React from 'react'
import { NavBar } from '../ui/NavBar'
import {BiHeart} from 'react-icons/bi'

export const ProductScreen = () => {
    return (
        <>
            <NavBar />
            <section className = "mx-auto max-w-4xl container ">
                <div className = "flex mt-10 gap-10">
                    <div className = "w-1/2">
                        <img src="http://http2.mlstatic.com/D_726803-MPE32940503067_112019-O.jpg" alt="" className = "m-auto object-contain"/>
                    </div>
                    <div className = "w-1/2">
                        <h3 className = "font-bold text-2xl mb-5">TELEVISOR LG LED/LCD 4K ULTRA HD 55" SMART TV 55UP7750PSB</h3>
                        <p className = "font-normal text-xl mb-5">¡Sorpréndete con una impresionante tecnología y gran calidad de imágenes gracias a LG! El Smart TV Thinq AI 55UP7750PSB tiene todo lo que buscas. Lo mejor en TV´S está en Ripley.com</p>
                        <div className = "flex justify-between mb-2 font-light text-lg">
                            <p className = "">Antes</p>
                            <p className = "line-through">3099</p>
                        </div>
                        <div className = "flex justify-between mb-2 font-medium text-lg">
                            <p>Ahora</p>
                            <p>2800</p>
                        </div>
                        <div className = "flex justify-between mb-4 font-medium text-lg">
                            <p>Descuento</p>
                            <p>20%</p>
                        </div>

                        <div className = "flex w-full bg-purple-500 rounded-lg border-purple-500 border-2 overflow-hidden">
                            <div className = "w-20 p-2 bg-white" >
                                <BiHeart className = "w-10 h-8 mx-auto text-purple-500"/>
                            </div>
                            <button className = "w-full text-white font-medium text-lg">
                                Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
                <div className = "border-t border-gray-300">
                    <p className = "my-5">LOS CLIENTES QUE VIERON ESTE PRODUCTO TAMBIÉN VIERON</p>
                </div>
            </section>
        </>
    )
}
