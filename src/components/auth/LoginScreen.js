import React, { useContext, useEffect } from 'react'
import { Formik } from "formik";
import { Link, useHistory } from 'react-router-dom'
import { BsFacebook, BsFillCheckCircleFill, BsGoogle, BsLinkedin, BsTwitter } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

import { NavBarAuth } from '../ui/NavBarAuth'
import AuthContext from '../../context/auth/AuthContext'
import { SpinnerDotted } from 'spinners-react';

export const LoginScreen = () => {

    const history = useHistory();
    const {startLoginEmailPassword, startLoginGoogle, startLoginWithFacebook, state} = useContext(AuthContext);

    useEffect(() => {
        if (state.uid) {
            setTimeout(() => {
                history.push("/")
            }, 1000);
        }
    }, [state, history])

    return (
        <div className = "bg-gray-200 h-screen">
            <NavBarAuth />
            <div className="max-w-sm mx-auto rounded shadow-lg md:max-w-md my-10 p-6 pb-10 bg-gray-100 animate__animated animate__fadeInDown">
                <div className=" flex justify-center border-b border-gray-300">
                    <h1 className="font-bold text-lg text-gray-400 pb-1">Login</h1>
                </div>
                <div className=" pt-6">
                <Formik
                    initialValues = {{
                        email : '',
                        password : ""
                    }}
                    validate = {(values) => {
                        let errors = {}
                        if (!values.email ) {
                            errors.email = "Por favor ingrese un correo"
                        }else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                            errors.email = "Por favor ingrese un correo valido"
                        }
        
                        if (!values.password ) {
                            errors.password = "Por favor ingrese su contraseña"
                        }
        
                        return errors
                    }}
        
                    onSubmit = {async (values) => {
                        await startLoginEmailPassword(values.email, values.password);
                    }}
                  >
                      {({values,errors, handleSubmit, handleChange, handleBlur, touched}) => (
                        <form className=" text-center" onSubmit = {handleSubmit}>
                            <div className = "relative">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className= { !touched.email || !errors.email ? "block border p-2 bg-white w-full h-10 focus:outline-none focus:border-blue-400 rounded text-sm placeholder-gray-600 placeholder-opacity-40 text-gray-600" : "block border border-red-500 p-2 bg-white w-full h-10 focus:outline-none focus:border-red-400 rounded text-sm placeholder-gray-600 placeholder-opacity-40 text-gray-600"}
                                    placeholder="Email or User*"
                                    value = {values.email}
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                /> 
                                {
                                    !touched.email || !errors.email
                                    ? <BsFillCheckCircleFill className = "absolute top-3 right-2 text-green-500"></BsFillCheckCircleFill> 
                                    : <AiFillCloseCircle className = "absolute top-3 right-2 text-lg text-red-700"></AiFillCloseCircle>
                                }
                                {touched.email && errors.email && <p className = "text-red-600 text-left px-2 text-sm">{errors.email}</p>}
                            </div>
                            <div className = "relative">
                                <input
                                type="password"
                                name="password"
                                className={!touched.password || !errors.password ? "mt-2 block border p-2 bg-white w-full h-10 focus:outline-none focus:border-blue-400 rounded text-sm placeholder-gray-600 placeholder-opacity-40 text-gray-600" : "mt-2 block border border-red-500 p-2 bg-white w-full h-10 focus:outline-none focus:border-red-400 rounded text-sm placeholder-gray-600 placeholder-opacity-40 text-gray-600"}
                                placeholder = "Password"
                                value = {values.password}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                />
                                    {
                                        !touched.password || !errors.password
                                        ? <BsFillCheckCircleFill className = "absolute top-3 right-2 text-green-500"></BsFillCheckCircleFill> 
                                        : <AiFillCloseCircle className = "absolute top-3 right-2 text-lg text-red-700"></AiFillCloseCircle>
                                    }
                                    {touched.password && errors.password && <p className = "text-red-600 text-left px-2 text-sm">{errors.password}</p>}
                        </div>
                        <button
                            type="submit"
                            className={`w-full h-9 bg-purple-500 text-sm font-semibold mt-5 rounded-sm text-gray-100 focus:outline-none hover:bg-purple-600 relative ${state.loading && "cursor-not-allowed bg-gray-500"}`}
                            >
                            Login
                            <SpinnerDotted 
                                className = "absolute top-2 right-3 w-full" 
                                size={20} thickness={143} speed={101} color="rgba(255, 255, 255, 1)" 
                                enabled = {state.loading}
                            />
                            </button>
                        </form>
                        )}
                    </Formik>
                <div className="pt-3 text-center">
                    <span className="text-gray-600 text-xs w-2/3">
                        You do not have an account?
                        <Link to="/register">
                        <span type="button" className="text-gray-700 text-xs font-bold">
                            {" "}
                            register here
                        </span>
                        </Link>
                    </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                    <hr className="w-full border-gray-300" />{" "}
                    <span className="p-2 text-gray-400 text-xs">OR</span>
                    <hr className="w-full border-gray-300" />
                </div>
                <div className="pt-2">
                    <p className="text-gray-700 font-bold pb-2 pl-1">You can also login with:</p>
                    <div className="flex justify-between items-center"> 
                        <button 
                            type="button" 
                            className="w-1/4 mx-1 p-2 font-bold text-white bg-blue-800 rounded focus:outline-none hover:bg-blue-900"
                            onClick = { () => {
                                startLoginWithFacebook();
                            }}
                        >
                            <BsFacebook className = "m-auto text-2xl my-2"></BsFacebook>
                            Facebook
                        </button> 
                        <button 
                            type="button" 
                            className="w-1/4 mx-1 p-2 font-bold text-white bg-red-600 rounded focus:outline-none hover:bg-red-800"
                            onClick = { () => {
                                startLoginGoogle();
                            }}
                        >
                            <BsGoogle className = "m-auto text-2xl my-2"></BsGoogle>
                            Google
                        </button> 
                        <button 
                            type="button" 
                            className="w-1/4 mx-1 p-2 font-bold text-white bg-blue-800 rounded focus:outline-none hover:bg-blue-900"
                            
                        >
                            <BsLinkedin className = "m-auto text-2xl my-2"></BsLinkedin>
                            LinkedIn
                        </button> 
                        <button type="button" className="w-1/4 mx-1 p-2 font-bold text-white bg-blue-500 rounded focus:outline-none hover:bg-blue-900">
                            <BsTwitter className = "m-auto text-2xl my-2"></BsTwitter>
                            Twitter
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
