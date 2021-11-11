import React, { useContext, useState } from 'react'
import {BsCreditCard2Back, BsCheckLg} from 'react-icons/bs'
import {AiOutlineCalendar, AiOutlineLock} from 'react-icons/ai'
import {FaShoppingCart} from 'react-icons/fa'
import {FiHelpCircle} from 'react-icons/fi'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AuthContext from '../../context/auth/AuthContext'
import PaymentContext from '../../context/payment/PaymentContext'
import { totalToPayInCoutas } from '../../helpers/functions'
import { Link } from 'react-router-dom'
import { ModalPayment } from '../ui/modals/Modal'

export const FormPayment = ({setStatePasos , setStateComponent}) => {

    // Modal
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const {state:stateAuth} = useContext(AuthContext);
    const {state:statePayment, setDataUserPayment} = useContext(PaymentContext);

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const formik =  useFormik({
        initialValues : {
            name : '',
            celphone : '',
            email : stateAuth.email,
            address: '',
            couta : '',

            cardNumber : '',
            dateExpire : '',
            cvc : ''

        },
        validationSchema: Yup.object({
            name : Yup.string().required(),
            email : Yup.string().email().required(),
            celphone : Yup.string().matches(phoneRegExp, 'Numero de celular es invalido').required(),
            address : Yup.string().required(),
            cardNumber : Yup.string().required(),
            dateExpire : Yup.date().required(),
            cvc : Yup.string().required().max(3),
        }),
        onSubmit : (formData) => {
            setIsOpen(true);
            setTimeout(() => {
                setDataUserPayment(formData);
                
                setStatePasos({
                    shoppingCart : true,
                    payment : true,
                    confirmation: true,
                })
                setStateComponent({
                    componentShoppingCart : false,
                    componentPayment : false,
                    componentConfirmation : true,
                })
            }, 5300);

            setTimeout(() => {
                setIsOpen(false);
            }, 5000);
        }
    })
    return (
        <>
             <form action="" onSubmit = {formik.handleSubmit}>
                    <div className = "flex mb-5">
                        <label 
                            htmlFor="name"
                            className = "w-1/4 font-semibold text-base"
                        >Nombres y apellidos :</label>
                        <div className = "w-3/4">
                            <input 
                                name = "name"
                                type="text"
                                className = {`w-full py-1 rounded-sm outline-none px-3 ${formik.errors.name && formik.touched.name && 'errorInput'}`} 
                                placeholder = "Ingresa tu nombre y apellido"
                                onChange = {formik.handleChange}
                            />
                            <p className = "text-sm ml-2">
                                {formik.errors.name && formik.touched.name 
                                ? <span className = "error"> {formik.errors.name} </span>
                                : "Con estos datos se hará la facturación."}
                            </p>
                        </div>
                    </div>
                    <div className = "flex mb-5">
                        <label 
                            htmlFor="name"
                            className = "w-1/4 font-semibold text-base"
                        >Telefono :</label>
                        <div className = "w-3/4">
                            <input 
                                name = "celphone"
                                type="text"
                                className = {`w-full py-1 rounded-sm outline-none px-3 ${formik.errors.celphone && formik.touched.celphone && 'errorInput'}`}  
                                placeholder = "Ingresa tu numero de celular"
                                onChange = {formik.handleChange}
                            />
                            <p className = "text-sm ml-2">
                                {formik.errors.celphone && formik.touched.celphone 
                                ? <span className = "error"> {formik.errors.celphone} </span> 
                                : "Puede que necesitemos contactarnos por tu compra."}
                            </p>
                        </div>
                    </div>
                    <div className = "flex mb-5">
                        <label 
                            htmlFor="name"
                            className = "w-1/4 font-semibold text-base"
                        >Email :</label>
                        <div className = "w-3/4">
                            <input 
                                name = "email"
                                disabled
                                type="email"
                                className = "w-full py-1 rounded-sm outline-none px-3 bg-gray-300"
                                onChange = {formik.handleChange}  
                                value = {formik.values.email}
                            />
                        </div>
                    </div>
                    <div className = "flex mb-5">
                        <label 
                            htmlFor="name"
                            className = "w-1/4 font-semibold text-base"
                        >Direccion :</label>
                        <div className = "w-3/4">
                            <input 
                                name = "address"
                                type="text"
                                className = "w-full py-1 rounded-sm outline-none px-3"
                                placeholder = "Ingresa tu direccion COMPLETA" 
                                onChange = {formik.handleChange}
                            />
                            <p className = "text-sm ml-2">Es la dirección a la que enviaremos tu pedido</p>
                        </div>
                    </div>
                    <div className = "flex">
                        <h3 className = "w-1/4 text-2xl mb-5 font-semibold">Cuotas</h3>
                        <div className = "w-3/4">
                            <div className = "mb-1">
                                <input 
                                    type="radio" 
                                    name="couta" 
                                    id="cuota1"  
                                    className = "mr-3"
                                    value = {1}
                                    onChange = {formik.handleChange}
                                />
                                <label htmlFor="cuota1" className = "cursor-pointer">1 Cuota de S/. {statePayment.total}</label>
                            </div>
                            <div className = "mb-1">
                                <input 
                                    type="radio" 
                                    name="couta" 
                                    id="cuota3"  
                                    className = "mr-3"
                                    value = {3}
                                    onChange = {formik.handleChange}
                                />
                                <label htmlFor="cuota3" className = "cursor-pointer">
                                        3 Cuotas de S/. {(totalToPayInCoutas(statePayment.total, "3")/3).toFixed(2) }  
                                        (Int.: 8%) Total: S/. {totalToPayInCoutas(statePayment.total, "3")}
                                </label>
                            </div>
                            <div className = "mb-1">
                                <input 
                                    type="radio" 
                                    name="couta" 
                                    id="cuota4"  
                                    className = "mr-3"
                                    value = {6}
                                    onChange = {formik.handleChange}
                                />
                                <label htmlFor="cuota4" className = "cursor-pointer">
                                    6 Cuotas de S/. {(totalToPayInCoutas(statePayment.total, "6")/6).toFixed(2)}  (Int.:12%) Total: S/. {totalToPayInCoutas(statePayment.total, "6")} 
                                </label>
                            </div>
                            <div className = "mb-1">
                                <input 
                                    type="radio" 
                                    name="couta" 
                                    id="cuota5"  
                                    className = "mr-3"
                                    value = {12}
                                    onChange = {formik.handleChange}
                                />
                                <label htmlFor="cuota5" className = "cursor-pointer">
                                    12 Cuotas de S/. {(totalToPayInCoutas(statePayment.total, "12")/12).toFixed(2)}  (Int.: 20%) Total: S/. {totalToPayInCoutas(statePayment.total, "12")} 
                                </label>
                            </div>
                            <div className = "mb-1">
                                <input 
                                    type="radio" 
                                    name="couta" 
                                    id="cuota6"  
                                    className = "mr-3"
                                    value = {18}
                                    onChange = {formik.handleChange}
                                />
                                <label htmlFor="cuota6" className = "cursor-pointer">
                                    18 Cuotas de S/. {(totalToPayInCoutas(statePayment.total, "18")/18).toFixed(2)}  (Int.: 30%) Total: S/. {totalToPayInCoutas(statePayment.total, "18")} 
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 w-full p-5">
                        <div className = "w-full">
                            <label className="relative w-full flex flex-col">
                                <span className="font-bold mb-3">Numero de tarjeta</span>
                                <input 
                                    className={`rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 ${formik.errors.cardNumber && formik.touched.cardNumber && 'errorInput'}`} 
                                    type="text" 
                                    name="cardNumber" 
                                    placeholder="0000 0000 0000" 
                                    onChange = {formik.handleChange}
                                />
                                <BsCreditCard2Back className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"></BsCreditCard2Back>
                            </label>
                            <p className = "text-sm ml-2">
                                {formik.errors.cardNumber && formik.touched.cardNumber 
                                && <span className = "error"> {formik.errors.cardNumber} </span> 
                                }
                            </p>
                        </div>
                        
                        <div>
                            <label className="relative flex-1 flex flex-col">
                                <span className="font-bold mb-3">Fecha de expiracion</span>
                                <input 
                                    className={`rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 ${formik.errors.dateExpire && formik.touched.dateExpire && 'errorInput'}`} 
                                    type="text" 
                                    name="dateExpire" 
                                    placeholder="MM/YY" 
                                    onChange = {formik.handleChange}
                                />
                                <AiOutlineCalendar className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"></AiOutlineCalendar>
                            </label>
                            <p className = "text-sm ml-2">
                                {formik.errors.dateExpire && formik.touched.dateExpire 
                                && <span className = "error"> {formik.errors.dateExpire} </span> 
                                }
                            </p>
                        </div>
                        
                        <div>
                            <label className="relative flex-1 flex flex-col">
                                <span className="font-bold flex items-center gap-3 mb-3">
                                CVC/CVV
                                <span className="relative group">
                                    <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-black text-white"> Hey ceci est une infobulle !</span>
                                    <FiHelpCircle className="h-4 w-4"></FiHelpCircle>
                                </span>
                                </span>
                                <input 
                                    className={`rounded-md peer pl-12 pr-2 py-2 border-2 border-gray-200 placeholder-gray-300 ${formik.errors.cvc && formik.touched.cvc && 'errorInput'}`} 
                                    type="number" 
                                    name="cvc" 
                                    placeholder="&bull;&bull;&bull;"
                                    onChange = {formik.handleChange} 
                                    maxLength = "3"
                                />
                                <AiOutlineLock className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"></AiOutlineLock>
                            </label>
                            <p className = "text-sm ml-2">
                                {formik.errors.cvc && formik.touched.cvc 
                                && <span className = "error"> {formik.errors.cvc} </span> 
                                }
                            </p>
                        </div>
                    </div>

                    <div className = "flex justify-between mt-8">
                        <Link to = "/">
                            <button className = "border flex gap-2 items-center border-purple-500 p-2 rounded-lg text-purple-500 font-semibold hover:bg-purple-500 hover:text-white">
                                Volver al carrito
                                <FaShoppingCart></FaShoppingCart>
                            </button>
                        </Link>
                    <button 
                        type = "submit"
                        className = "border flex gap-2 items-center border-purple-500 p-2 rounded-lg text-white font-semibold bg-purple-500 hover:bg-purple-600"
                        onClick = {() => {
                            
                        }}
                    >
                        Confirmar y pagar
                        <BsCheckLg></BsCheckLg>
                    </button>
                </div>
                </form>
                <div>       
            </div>
            {
                isOpen && <ModalPayment />
            }
            
        </>
    )
}
