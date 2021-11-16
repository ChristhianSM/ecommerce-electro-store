import React from 'react'
import {SiDropbox} from 'react-icons/si'
import {GiDiploma} from 'react-icons/gi'

export const ProductDevolution = () => {
    return (
        <div className = "animate__animated animate__fadeIn">
            <div className ="flex justify-between gap-7 items-center">
                <div className = "rounded-full p-4 bg-gray-200">
                    <SiDropbox className = "text-6xl text-black"></SiDropbox>
                </div>
                <div>
                    <h3 className = "text-xl font-semibold mb-2">Cambios y Devoluciones</h3>
                    <p>Puedes acercarte a cualquier tienda ElectroStore a realizar el cambio o devolución del producto, de manera gratuita, tienes desde 7 hasta 30 días hábiles dependiendo del tipo de producto. Para mayor información, revisa nuestras políticas sobre cambios y devoluciones, comunícate al (073) 301402 o escríbenos por whatsapp (959686193)</p>
                </div>
            </div>
            <div className ="flex justify-between gap-7 items-center mt-8">
                <div className = "rounded-full p-4 bg-gray-200">
                    <GiDiploma className = "text-6xl text-black"></GiDiploma>
                </div>
                <div>
                    <h3 className = "text-xl font-semibold mb-2">Garantía y Asistencia</h3>
                    <p>Los productos que Ripley comercializa cuentan con garantía de funcionamiento cuyo periodo de vigencia varía dependiendo del tipo de producto. Para mueblería y electro, te recomendamos revisar el certificado de garantía que llega con el producto.</p>
                </div>
            </div>
        </div>
    )
}
