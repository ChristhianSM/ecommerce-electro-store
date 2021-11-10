import React from 'react'
import {FaRegUser} from 'react-icons/fa'
import {RiLockPasswordLine} from 'react-icons/ri'
import {MdFavorite} from 'react-icons/md'
import {IoMdContacts} from 'react-icons/io'

export const PerfilAside = ({setStateComponent, stateComponent}) => {
    return (
        <aside className = "col-span-1 animate__animated animate__fadeInLeft">
            <button 
                className = {`border bg-white w-full p-5 shadow-xl mb-2 flex items-center justify-center text-xl ${stateComponent.perfilData && 'bg-purple-600 text-white'}`}
                onClick = {
                    () => {
                        setStateComponent({
                            perfilData : true,
                            perfilPassword : false, 
                            perfilFavorites : false,
                        })
                    }
                }
            >
                <FaRegUser className = "mr-2 text-2xl"></FaRegUser>
                Mi perfil</button>
            <button 
                className = {`border bg-white w-full p-5 shadow-xl mb-2 flex items-center justify-center text-xl ${stateComponent.perfilPassword && 'bg-purple-600 text-white'}`}
                onClick = {
                    () => {
                        setStateComponent({
                            perfilData : false,
                            perfilPassword : true, 
                            perfilFavorites : false,
                        })
                    }
                }
            >
                <RiLockPasswordLine className = "mr-2 text-2xl"></RiLockPasswordLine>
                Contraseña</button>
            <button 
                className = {`border bg-white w-full p-5 shadow-xl mb-2 flex items-center justify-center text-xl ${stateComponent.perfilFavorites && 'bg-purple-600 text-white'}`}
                onClick = {
                    () => {
                        setStateComponent({
                            perfilData : false,
                            perfilPassword : false, 
                            perfilFavorites : true,
                        })
                    }
                }
                
            >
                <MdFavorite className = "mr-2 text-2xl"></MdFavorite>
                Favoritos</button>

            <button 
                className = {`border bg-white w-full p-5 shadow-xl mb-2 flex items-center justify-center text-xl ${stateComponent.perfilContacts && 'bg-purple-600 text-white'}`}
                onClick = {
                    () => {
                        setStateComponent({
                            perfilData : false,
                            perfilPassword : false, 
                            perfilFavorites : false,
                            perfilContacts : true,
                        })
                    }
                }
                
            >
                <IoMdContacts className = "mr-2 text-2xl"></IoMdContacts>
                Contactanos</button>
        </aside>
    )
}
