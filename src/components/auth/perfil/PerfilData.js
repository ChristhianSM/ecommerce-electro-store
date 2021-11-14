import React, { useContext, useState } from 'react'
import AuthContext from '../../../context/auth/AuthContext';
import { useFormik} from 'formik'
import * as Yup from 'yup'
import { SpinnerCircularFixed } from 'spinners-react';

export const PerfilData = () => {
    
    const {state, updateDataUser} = useContext(AuthContext);

    const [isOpen, setIsOpen] = useState(false);

    const formik = useFormik({
        initialValues : {
            name : state.name,
            lastName : state.lastName,
            email: state.email,
            celphone : state.celphone,
            document: state.document,
        },
        validationSchema : Yup.object({
            name: Yup.string("Debe ingresar un nombre valido").required("El Nombre es requerido"),
            lastName: Yup.string("Debe ingresar un apellido valido").required("El Apellido es requerido"),
            email: Yup.string().email("Debe ingresar un correo valido").required("El email es requerido"),
        }),
        onSubmit : (values) => {
            if (values.name !== state.name || values.lastName !== state.lastName || values.celphone !== state.celphone || values.document !== state.document) {
                updateDataUser(values);
            }
        },
    })
    
    return (
        <div className="w-full bg-grey-lightest col-span-3 animate__animated animate__fadeInRight">
            <div className="container mx-auto">
                <div className="mx-auto bg-white rounded shadow-lg border">
                    <div className="py-4 px-8 text-black text-2xl font-bold ">Informacion Personal</div>
                    <p className = "pb-2 px-8 text-black border-b border-grey-lighter font-Barlow">Aqui encontrarás tu informacion personal. Si la quieres modificar.</p>
                    
                    <form 
                        className="py-4 px-8" 
                        onSubmit = {formik.handleSubmit}
                    >
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-1">
                                    <label 
                                        className={`block text-grey-darker text-sm font-bold mb-2 ${formik.touched.name && formik.errors.name && 'text-red-500'}`} 
                                        htmlFor="first_name">Nombres</label>
                                    <input 
                                        className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none ${formik.touched.name && formik.errors.name && 'errorInput'}`}
                                        name="name" 
                                        type="text" 
                                        placeholder="Your first name"
                                        value = {formik.values.name}
                                        onChange = {formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                    />
                                    {formik.touched.name && formik.errors.name && <p className = "error"> {formik.errors.name} </p>}
                                    
                                </div>
                                <div className="w-1/2 ml-1">
                                    <label 
                                        className={`block text-grey-darker text-sm font-bold mb-2 ${formik.touched.lastName && formik.errors.lastName && 'text-red-500'}`} 
                                        htmlFor="last_name">Apellidos</label>
                                    <input 
                                        className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none ${formik.touched.lastName && formik.errors.lastName && 'errorInput'}`} 
                                        name="lastName" 
                                        type="text" 
                                        placeholder="Your last name"
                                        value = {formik.values.lastName}
                                        onChange = {formik.handleChange}
                                        onBlur = {formik.handleBlur}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName && <p className = "error"> {formik.errors.lastName} </p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">Correo Electronico</label>
                                <input 
                                    className="appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none" 
                                    disabled 
                                    name="email" 
                                    type="email" 
                                    placeholder="Your email address"
                                    value = {formik.values.email}
                                    onChange = {formik.handleChange}
                                    // onBlur = {handleBlur}
                                />
                            </div>
                            <div className="flex mb-4">
                                <div className="w-1/2 mr-1">
                                <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Tipo de documento
                                </p>
                                <div className="flex">
                                    <div className = "relative">
                                        <select className="block appearance-none w-20 bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                            <option>DNI</option>
                                            <option>CE</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                    <input 
                                        className="ml-2 appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none" 
                                        name = "document"
                                        type="text" 
                                        placeholder="Your Document"
                                        value = {formik.values.document}
                                        onChange = {formik.handleChange}
                                        // onBlur = {handleBlur}
                                    />
                                </div>

                                </div>
                                <div className="w-1/2 ml-1">
                                    <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="last_name">Celular</label>
                                    <input 
                                        className="appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none" 
                                        name="celphone" 
                                        type="text" 
                                        placeholder="Your celphone"
                                        value = {formik.values.celphone}
                                        onChange = {formik.handleChange}
                                        // onBlur = {handleBlur}
                                    />
                                </div>
                            </div>
                            <div className = "flex justify-around pt-6">
                                <button className = "w-40 text-center border border-purple-600 text-purple-500 p-2 rounded-lg outline-none hover:bg-purple-600 hover:text-white" type = "button">Cancel</button>
                                <button className = {`w-40 text-center border text-white p-2 rounded-lg outline-none bg-purple-500 hover:bg-purple-600 ${state.loading && 'cursor-not-allowed'}`} type = "submit">Actualizar Datos</button>
                            </div>
                    </form>
                    {
                        state.loading &&
                        <div className = "w-full h-full fixed top-0 left-0 bg-black bg-opacity-30 flex items-center justify-center p-16">
                           <SpinnerCircularFixed size={70} thickness={100} speed={100} color="rgba(124, 58, 237, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" />
                        </div>        
                    }
                </div>
            </div>
        </div>
    )
}
