import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AuthContext from '../../../context/auth/AuthContext'
import { alertPassword } from '../../../helpers/alerts'
import { SpinnerCircularFixed } from 'spinners-react'

export const PerfilPassword = () => {

    const {state, state:{password},updatePasswordUser} = useContext(AuthContext);

    const formik = useFormik({
        initialValues : {
            currentPassword : '',
            newPassword : '',
            confirmPassword: ''
        },
        validationSchema : Yup.object({
            currentPassword: Yup.string().required("The current password is required"),
            newPassword: Yup.string().required("New Password is required"),
            confirmPassword: Yup.string().required("Password is required").oneOf([Yup.ref("newPassword"), null], "Password must match"),
        }),
        onSubmit : (values) => {
            if (password === values.currentPassword) {
                updatePasswordUser(values.newPassword);
            }else{
                alertPassword("Current Password Incorrect", 'bottom-end', 'error')
            }
        },
    })

    return (
        <div className="w-full bg-grey-lightest col-span-3 animate__animated animate__fadeInRight">
            <div className="container mx-auto">
                <div className="mx-auto bg-white rounded shadow-lg border">
                    <div className="py-4 px-8 text-black text-2xl font-bold ">Modificar Contraseña</div>
                    <p className = "pb-2 px-8 text-black border-b border-grey-lighter font-Barlow">Aqui encontrarás tu contraseña. Si la quieres modificar asegúrate de que sea segura.</p>
                    <form 
                        className="py-8 px-8"
                        onSubmit = {formik.handleSubmit}
                    >
                        <div className="flex mb-4">
                            <div className="w-1/3 mr-1">
                                <label 
                                    className={`block text-grey-darker text-sm font-bold mb-2 ${formik.touched.currentPassword && formik.errors.currentPassword && 'text-red-500'}`} 
                                    htmlFor="first_name">Contraseña actual </label>
                                <input 
                                    className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none ${formik.touched.currentPassword && formik.errors.currentPassword && 'errorInput'}`} 
                                    name="currentPassword" 
                                    type="password" 
                                    placeholder="Contraseña actual *"
                                    value = {formik.values.currentPassword}
                                    onChange = {formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                />
                                {formik.touched.currentPassword && formik.errors.currentPassword && <p className = "error"> {formik.errors.currentPassword} </p>}
                            </div>
                            <div className="w-1/3 ml-1">
                                <label 
                                    className={`block text-grey-darker text-sm font-bold mb-2 ${formik.touched.newPassword && formik.errors.newPassword && 'text-red-500'}`}
                                    htmlFor="last_name">Nueva Contraseña</label>
                                <input 
                                    className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none ${formik.touched.newPassword && formik.errors.newPassword && 'errorInput'}`} 
                                    name="newPassword" 
                                    type="password" 
                                    placeholder="Nueva Contraseña *"
                                    value = {formik.values.newPassword}
                                    onChange = {formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                />
                                {formik.touched.newPassword && formik.errors.newPassword && <p className = "error"> {formik.errors.newPassword} </p>}
                            </div>

                            <div className="w-1/3 ml-1">
                                <label 
                                    className={`block text-grey-darker text-sm font-bold mb-2 ${formik.touched.confirmPassword && formik.errors.confirmPassword && 'text-red-500'}`}
                                    htmlFor="last_name">Confirmar contraseña</label>
                                <input 
                                    className={`appearance-none border rounded w-full py-2 px-3 text-grey-darker outline-none ${formik.touched.confirmPassword && formik.errors.confirmPassword && 'errorInput'}`} 
                                    name="confirmPassword" 
                                    type="password" 
                                    placeholder="Confirmar contraseña *"
                                    value = {formik.values.confirmPassword}
                                    onChange = {formik.handleChange}
                                    onBlur = {formik.handleBlur}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && <p className = "error"> {formik.errors.confirmPassword} </p>}
                            </div>
                        </div>
                        <div className = "flex justify-around pt-6">
                            <button 
                                type = "button"
                                className = "w-40 text-center border border-purple-600 text-purple-500 p-2 rounded-lg outline-none hover:bg-purple-600 hover:text-white"
                                onClick = { () => {
                                    formik.resetForm()
                                }}
                            >Limpiar</button>
                            <button 
                                type = "submit"
                                className = "w-40 text-center border text-white p-2 rounded-lg outline-none bg-purple-500 hover:bg-purple-600"
                            >Cambiar Contraseña</button>
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
