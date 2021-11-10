import React from 'react'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

export const Input = ({name, placeholder, type, leyendaError, expresionRegular, state, changeState, validatePassword}) => {

    const handleChangeInput = (e) => {
        changeState({
            ...state,
            campo : e.target.value
        })
    }

    const handleValidation = () => {

        if(expresionRegular){
            if (expresionRegular.test(state.campo)) {
                changeState({
                    ...state,
                    valid: true,
                })
            }else{
                changeState({
                    ...state,
                    valid: false,
                })
            }
        }

        if (validatePassword) {
            validatePassword();
        }
    }
    return (
        <div className = "relative my-3">
            <input 
                type={type} 
                name={name} 
                className={state.valid ? "block border p-2 pr-8 bg-white w-full h-10 focus:outline-none focus:border-blue-400 rounded text-sm placeholder-gray-600 placeholder-opacity-40 text-gray-600" : "block border-2 border-red-500 p-2 pr-8 bg-white w-full h-10 focus:outline-none focus:border-red-500 rounded text-sm placeholder-gray-600 placeholder-opacity-40 text-gray-600"}
                 
                placeholder={placeholder} 
                onChange = {handleChangeInput}
                value = {state.campo}
                onKeyUp = {handleValidation}
                onBlur = {handleValidation}
            />
            {
                state.valid 
                ? <BsFillCheckCircleFill className = "absolute top-3 right-2 text-green-500"></BsFillCheckCircleFill> 
                : <AiFillCloseCircle className = "absolute top-3 right-2 text-lg text-red-700"></AiFillCloseCircle>
                
            }
            
            <p className = {state.valid ? "hidden" : "pl-2 text-left text-sm text-red-500 block" }>{leyendaError} </p>
    </div>
    )
}
 