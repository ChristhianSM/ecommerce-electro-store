import React, { useContext, useEffect } from 'react'
import {GoSettings} from 'react-icons/go'
import ProductContext from '../../context/product/ProductContext';
import { orderMaximunPrice } from '../../helpers/functions';

export const Aside = ({category}) => {

    const marcas = ["Lenovo", "HP", "Dell", "Asus", "Apple", "Acer", "MSI", "Toshiba", "Huawei"];

    const {state, setFilters, deleteFilter, getProductsForFilters} = useContext(ProductContext);

    const stateFilters = state.filters;

    useEffect(() => {
        deleteFilter();
    }, [])

    const handleCheck = (e) => {
        const currentIndex = stateFilters.indexOf(e.target.name);
        if (e.target.checked) {
            stateFilters.push(e.target.name);
        }else{
            stateFilters.splice(currentIndex, 1);;           
        } 
        setFilters(stateFilters);
        getProductsForFilters();
    }

    const handlePrice = () => {
        
    }

    return (
        <aside className = "col-span-1 animate__animated animate__fadeInLeft">
            <h2 className = "font-bold text-3xl bg-gray-300 p-3 border-l-8 border-purple-600">{category}</h2>

            <div className="filtros mt-5 bg-gray-300 p-3 px-6">
                <div className= "flex items-center">
                    <GoSettings className = "mr-3 text-xl"></GoSettings>
                    <h2 className = "text-2xl">Filtros</h2>
                </div>

                <div className="marca my-4">
                    <h3 className = "text-lg font-bold">Marca</h3>
                    {
                        marcas.map( marca => {
                            return (
                                <div className = "flex items-center my-2" key = {marca}>
                                    <input 
                                        type="checkbox" 
                                        className = "mr-2 h-5 w-5"
                                        name={marca} 
                                        id={marca} 
                                        onChange = {handleCheck}
                                    />
                                    <label htmlFor={marca} className = "text-lg">{marca}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <form className="precio" onSubmit = {handlePrice}>
                    <h3 className = "text-lg font-bold">Precio</h3>
                    <p className = "my-4">Selecciona un rango de precio para filtrar tu búsqueda.</p>
                    <div className = "flex gap-2">
                        <label htmlFor="minPrice" className = "font-medium w-28"> Precio Minimo</label>
                        <input 
                            type="number" 
                            className = "outline-none border-gray-400 border w-24 px-4 rounded-md"
                            min = "0"
                        />
                    </div>
                    <div className = "flex gap-2 mt-2">
                        <label htmlFor="minPrice" className = "font-medium w-28"> Precio Maximo</label>
                        <input 
                            type="number" 
                            className = "outline-none border-gray-400 border w-24 px-4 rounded-md "
                        />
                    </div>
                </form>
            </div>    
        </aside>
    )
}
