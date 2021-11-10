import React, { useContext, useState } from 'react'
import { NavBar } from '../ui/NavBar'
import {FaRegUserCircle} from 'react-icons/fa'
import AuthContext from '../../context/auth/AuthContext'
import { PerfilAside } from './PerfilAside'
import { PerfilData } from './PerfilData'
import { PerfilPassword } from './PerfilPassword'
import { PerfilFavorites } from './PerfilFavorites'
import { PerfilContacts } from './PerfilContacts'

export const PerfilScreen = () => {

    const {state} = useContext(AuthContext);
    const [stateComponent, setStateComponent] = useState({
        perfilData : true,
        perfilPassword : false, 
        perfilFavorites : false,
        perfilContacts : false,
    })

    return (
        <>
            <NavBar />
            <div className = "container mx-auto my-5 custom right-0 left-0">
                <div className="border shadow-lg p-5 flex items-center animate__animated animate__fadeIn">
                    <FaRegUserCircle className = "text-7xl font-semibold"></FaRegUserCircle>
                    <div className = "ml-5 text-2xl">
                        <p>Hello !! </p>
                        <p className = "font-bold">{state.name}</p>
                    </div>
                </div>

                <div className="font-sans antialiased bg-grey-lightest grid grid-cols-4 gap-3  py-8">
                    <PerfilAside 
                        setStateComponent = {setStateComponent}
                        stateComponent = {stateComponent}
                    />
                    {
                        stateComponent.perfilData && <PerfilData />
                    }
                    {
                        stateComponent.perfilPassword && <PerfilPassword />
                    }
                    {
                        stateComponent.perfilFavorites && 
                        <PerfilFavorites favoritesProducts = {state.favoritesProducts}/>
                    }  
                    {
                        stateComponent.perfilContacts && 
                        <PerfilContacts />
                    }  
                </div>
            </div>
        </>
    )
}
