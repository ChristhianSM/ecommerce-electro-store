import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SpinnerDotted } from 'spinners-react'
import AuthContext from '../../context/auth/AuthContext'
import { NavBarAuth } from '../ui/NavBarAuth'
import { Input } from './Input'

const expresiones = {
	usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{6,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

export const RegisterScreen = () => {

    const [nameInput, setNameInput] = useState({
        campo : '',
        valid : true,
    })
    const [lastNameInput, setlastNameInput] = useState({
        campo : '',
        valid : true,
    })

    const [emailInput, setEmailInput] = useState({
        campo : '',
        valid : true,
    })
    const [passwordInput, setPasswordInput] = useState({
        campo : '',
        valid : true,
    })
    const [confirmPasswordInput, setconfirmPasswordInput] = useState({
        campo : '',
        valid : true,
    })

    const validatePassword = () => {
        if (passwordInput.campo.length > 0) {
            if (passwordInput.campo === confirmPasswordInput.campo) {
                setconfirmPasswordInput({
                    ...confirmPasswordInput,
                    valid : true
                })
            }else{
                setconfirmPasswordInput({
                    ...confirmPasswordInput,
                    valid : false
                })
            }
        }
    }
    
    const history = useHistory();
    const {state, startRegisterWithEmailPasswordName} = useContext(AuthContext);

    useEffect(() => {
        if (state.uid) {
            setTimeout(() => {
                history.push("/")
            }, 3000);
        }
    }, [state, history])

    const handleSubmitForm = (e) => {
        e.preventDefault();
        startRegisterWithEmailPasswordName(emailInput.campo, passwordInput.campo, nameInput.campo, lastNameInput.campo);
    }

    return (
        <div className = "bg-gray-200 h-screen">  
            <NavBarAuth />
                <div className="max-w-sm mx-auto rounded shadow-lg md:max-w-md my-10 p-6 pb-10 bg-gray-100 animate__animated animate__fadeInRight">
                    <div className=" flex justify-center border-b border-gray-300">
                        <h1 className="font-bold text-lg text-gray-400 pb-1">Registro</h1>
                    </div>
                    <div className=" pt-6">
                        <form className=" text-center" onSubmit = {handleSubmitForm}> 
                            <Input 
                                type = "text"
                                name = "name"
                                placeholder = "Nombre*"
                                leyendaError = "El Nombre debe ser de 4 a 16 letras y solo puede contener letras"
                                expresionRegular = {expresiones.nombre}
                                state = {nameInput}
                                changeState = {setNameInput}
                            />
                            <Input 
                                type = "text"
                                name = "Apellido"
                                placeholder = "Apellidos"
                                leyendaError = "Los apellidos debe ser de 4 a 16 letras y solo puede contener letras"
                                expresionRegular = {expresiones.nombre}
                                state = {lastNameInput}
                                changeState = {setlastNameInput}
                            />
                            <Input 
                                type = "email"
                                name = "email"
                                placeholder = "E-mail*"
                                expresionRegular = {expresiones.correo}
                                leyendaError = "El Email debe contener @ y un dominio"
                                state = {emailInput}
                                changeState = {setEmailInput}
                            />
                            <Input 
                                type = "password"
                                name = "password"
                                placeholder = "Contraseña*"
                                expresionRegular = {expresiones.password}
                                leyendaError = "La contraseña debe contener al menos 6 caracteres"
                                state = {passwordInput}
                                changeState = {setPasswordInput}
                            />
                            <Input 
                                type = "password"
                                name = "confirmPassword"
                                placeholder = "Confirma tu contraseña*"
                                state = {confirmPasswordInput}
                                changeState = {setconfirmPasswordInput}
                                leyendaError = "Las contraseñas deben ser iguales"
                                validatePassword = {validatePassword}
                            />

                            <button 
                                type="submit" 
                                className={`w-full h-9 text-sm  bg-purple-500 font-semibold mt-2 rounded-sm text-gray-100 focus:outline-none hover:bg-purple-600 relative ${state.loading && "cursor-not-allowed bg-gray-500"} }`}
                            >
                                Crear Cuenta
                                <SpinnerDotted 
                                    className = "absolute top-2 right-3 w-full" 
                                    size={20} thickness={143} speed={101} color="rgba(255, 255, 255, 1)"
                                    enabled = {state.loading} 
                                />
                            </button>
                        </form>
                    </div>

                    <div className="pt-3 text-center"> 
                        <span className="text-gray-600 text-xs w-2/3">Ya tienes una cuenta? 
                            <Link to = "/auth/login">
                                <span 
                                    type="button" 
                                    className="text-gray-700 text-xs font-bold"
                                > 
                                    Inicia Sesión
                                </span>
                            </Link> 
                        </span> 
                    </div>
                </div>
        </div>
    )
}
