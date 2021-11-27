import React from 'react'
import {FaSearch} from 'react-icons/fa'

export const SearchEmpty = () => {
    return (
        <div className = "col-span-3 justify-center flex flex-col items-center p-20 animate__animated animate__bounceIn">
            <div>
                <FaSearch className = "text-6xl font-thin text-purple-500"></FaSearch>
            </div>
            <p className = "text-5xl mt-10 font-semibold mb-5">¡Opps!</p>
            <p className = "text-3xl mt-4 mb-5 text-center" >No existe ningún producto con estos criterios de búsqueda.</p>
            <p className = "text-xl">Prueba con otra busqueda</p>
        </div>
    )
}
