import React from 'react'
import {GoSettings} from 'react-icons/go'
import { Checkbox } from '../ecommerce/shop/Checkbox';
import { RangePrices } from './RangePrices';

export const AsideSearch = ({category, marcas, categories, prices}) => {

    return (
        <aside className = "col-span-1 animate__animated animate__fadeInLeft">
            <h2 className = "font-bold text-xl bg-gray-300 p-3 border-l-8 border-purple-600">Tu busqueda : "{category}"</h2>

            <div className="filtros mt-5 bg-gray-300 p-3 px-6">
                <div className= "flex items-center">
                    <GoSettings className = "mr-3 text-xl"></GoSettings>
                    <h2 className = "text-2xl">Filtros</h2>
                </div>

                <div className="marca my-4">
                    <h3 className = "text-lg font-bold">Categorias</h3>
                    {   
                    categories.length === 1 
                    ? categories.map( category => {
                        return (
                            <Checkbox 
                                key = {category.name}
                                name = {category}
                                count = "1"
                            />
                        )
                    })
                    : categories.map( category => {
                            return (
                                <Checkbox 
                                    key = {category.name}
                                    name = {category}
                                />
                            )
                        })
                    }
                </div>

                <div className="marca my-4">
                    <h3 className = "text-lg font-bold">Marca</h3>
                    {   
                    marcas.length === 1 
                    ? marcas.map( marca => {
                        return (
                            <Checkbox 
                                key = {marca.name}
                                name = {marca}
                                count = "1"
                            />
                        )
                    })
                    : marcas.map( marca => {
                            return (
                                <Checkbox 
                                    key = {marca.name}
                                    name = {marca}
                                />
                            )
                        })
                    }
                </div>
                {  
                    <RangePrices 
                        prices = {prices}
                    />
                }
                
            </div>    
    </aside>
    )
}
