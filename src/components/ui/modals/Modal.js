import React, { useState } from 'react'
import { SpinnerCircular } from 'spinners-react'
import {AiFillCheckCircle} from 'react-icons/ai'

const Validate = () => {
    return(
        <>
            <div className = "relative text-center mb-5 animate__animated animate__bounceIn">
                <h3 className = "text-3xl">Datos validados correctamente</h3>
            </div>
            <AiFillCheckCircle className = "animate__animated animate__bounceIn text-8xl mx-auto text-purple-500"></AiFillCheckCircle>
        </>
    )
}

export const ModalPayment = () => {

    const [change, setChange] = useState(true);

    setTimeout(() => {
        setChange(false)
    }, 3000);

    return (
        <>
            <div className = "w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-20 flex items-center justify-center p-16">
                <div className = "w-1/3 h-1/3 bg-white relative rounded-xl p-16 text-black">
                    {
                        change ? 
                        <>
                            <div className = "relative text-center mb-5">
                                <h3 className = "text-3xl">Validando Datos</h3>
                            </div>
                            <SpinnerCircular 
                            size={100} thickness={100} speed={100} color="rgba(145, 57, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)"
                                className = "mx-auto"
                            />
                        </>
                        :
                        <Validate />
                    }
                </div>
            </div>
        </>
    )
}
