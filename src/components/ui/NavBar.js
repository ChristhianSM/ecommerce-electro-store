import React, { useContext} from 'react'
import {BsHandbag} from 'react-icons/bs'
import {IoCreateOutline} from 'react-icons/io5'
import {FiUserCheck} from 'react-icons/fi'
import {BiUserCircle, BiUser} from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'

import './navBar.css'
import Logo from './../../assets/images/logo.png'
import AuthContext from '../../context/auth/AuthContext'
import ProductContext from '../../context/product/ProductContext'
import ModalContext from '../../context/modal/ModalContext'
import { InputSearch } from './InputSearch'

export const NavBar = () => {

    const {state, startLogout} = useContext(AuthContext);
    const {state:stateModal, changeStateModalShoppingCart} = useContext(ModalContext);
    const {state:{shoppingCart}} = useContext(ProductContext);

    const {category} = useParams();

    const handleModal = () =>{
        changeStateModalShoppingCart(true);
    }

    return (
        <nav className = "bg-black fixed w-full top-0 z-10">
            <div className="container mx-auto max-w-7xl py-2 flex justify-between items-center text-white">
                <Link to = "/"> 
                    <div className="logo h-14 animate__animated animate__fadeInDown">
                        <img src={Logo} alt="" className = "h-full"/>
                    </div>
                </Link>
                
                <InputSearch />

                <div className="user flex justify-between items-center animate__animated animate__fadeIn">
                    {
                        state.name 
                        ? 
                        (<div className ="flex items-center mr-10">
                            <div className="dropdown inline-block relative">
                                <button className="font-semibold py-2 px-4 rounded inline-flex items-center text-white">
                                    <BiUserCircle className = "text-5xl mr-2"></BiUserCircle>
                                    <div className = "text-center mr-1">
                                        <p>Bienvenid@</p>
                                        <p>Mi cuenta </p>
                                    </div>
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
                                </button>
                                <div className = "dropdown-menu absolute hidden text-gray-700 pt-1 w-52 bg-white p-2 text-center">
                                    <p className = "text-purple-600 text-xl font-semibold">Hola ! {state.name}</p>
                                    <Link to = "/perfil">
                                        <div className = "flex items-center mb-4 justify-center mt-2 hover:underline cursor-pointer">
                                            <FiUserCheck className = " text-xl mr-3"></FiUserCheck>
                                            <p>Mi cuenta</p>
                                        </div>
                                    </Link>
                                    <hr />
                                    <button 
                                        className = "my-2 border-gray-400 p-2 hover:bg-purple-600 hover:text-white outline-none w-full border"
                                        onClick = {() => {
                                            startLogout();
                                        }}
                                    >Cerrar Sesión</button>
                                </div>
                            </div>
                        </div>)
                        :
                        <div className="login flex items-center">
                            <Link to = "/login"> 
                                <div className="flex items-center mr-5 ">
                                    <BiUser className = "text-2xl"></BiUser>
                                        <p className = "m-2">Inicia sesión</p>
                                </div>
                            </Link>
                            <Link to = "/register"> 
                                <div className="flex items-center mr-5">
                                    <IoCreateOutline className = "text-2xl"></IoCreateOutline>
                                    <p className = "m-2">Crear cuenta</p>
                                </div>
                            </Link>
                        </div>
                        
                    }
                    <div className="">
                      
                        <button
                            className = {`flex relative ${stateModal.animationsShoppingCart &&"items-center animate__animated animate__headShake"}`}
                            onClick = {handleModal}
                        >
                            <BsHandbag className = "text-5xl mr-2"></BsHandbag>
                            <p className = "text-center absolute -bottom-3 right-0 bg-red-500 rounded-full h-6 w-6 flex justify-center items-center">{shoppingCart.length}</p>
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-gray-300">
                <div className="container mx-auto py-2">
                    <ul className = "flex items-center justify-center text-black text-lg">
                        <Link to = "/products/laptop">
                            <li className = {`mr-10 transition duration-500 ease-in-out p-3 rounded-xl cursor-pointer hover:bg-purple-500 transform hover:-translate-y-1 hover:scale-105 hover:text-white ${category === "laptop" && "bg-purple-500 text-white"}`}>
                                <p className = "">Laptops</p>
                            </li>
                        </Link>
                        <Link to = "/products/tablet">
                            <li className = {`mr-10 transition duration-500 ease-in-out p-3 rounded-xl cursor-pointer hover:bg-purple-500 transform hover:-translate-y-1 hover:scale-105 hover:text-white ${category === "tablet" && "bg-purple-500 text-white"}`}>
                                Tablets
                            </li>  
                        </Link>
                        <Link to = "/products/celular">
                            <li className = {`mr-10 transition duration-500 ease-in-out p-3 rounded-xl cursor-pointer hover:bg-purple-500 transform hover:-translate-y-1 hover:scale-105 hover:text-white ${category === "celular" && "bg-purple-500 text-white"}`}>
                                
                                Celulares
                            </li>
                        </Link>
                        <Link to = "/products/accesorios">
                            <li className = {`mr-10 transition duration-500 ease-in-out p-3 rounded-xl cursor-pointer hover:bg-purple-500 transform hover:-translate-y-1 hover:scale-110 hover:text-white ${category === "accesorios" && "bg-purple-500 text-white"}`}>
                                
                                Accesorios
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
