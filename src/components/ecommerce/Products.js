import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import ProductContext from '../../context/product/ProductContext'
import { orderProducts } from '../../helpers/functions'
import { Aside } from '../ui/Aside'
import { NavBar } from '../ui/NavBar'
import { ProductCategory } from './ProductCategory'

export const Products = () => {
    const params = useParams();
    const {state, getProductsForOrder,deleteFilter} = useContext(ProductContext);

    const handleSelect = (e) => {
        const productosOrdenados = orderProducts(state.filteredProducts, e.target.value); 
        getProductsForOrder(productosOrdenados);               
    }

    return (
        <>
            <NavBar />
            <div className="grid grid-cols-4 container mx-auto max-w-7xl py-10 gap-3 mt-48 custom right-0 left-0">
                <div className = "col-span-4 flex justify-between items-end border-b border-gray-400 pb-3">
                    <p className = "text-xl font-semibold"> Filtrados : 
                        <span className = "bg-gray-400 rounded-lg p-2 text-lg font-light ml-3">
                        { state.filteredProductsForFilters.length === 0 ? state.filteredProducts.length : state.filteredProductsForFilters.length}  Productos
                        </span>
                    </p>
                    <select 
                        name="orden" 
                        onChange = {handleSelect} 
                        className = "border border-gray-500 w-60 p-2 outline-none"
                    >
                        <option value="todos"  name = "orden">Todos</option>
                        <option value="menor" name = "orden">Menor Precio</option>
                        <option value="mayor" name = "orden">Mayor Precio</option>
                        <option value="marcaAsc" name = "orden"> Marca A - Z &#9650;
                        </option>
                        <option value="marcaDesc" name = "orden">Marca Z - A &#9660;</option>
                    </select>
                </div>
                <Aside 
                    category = {(params.category).toUpperCase()}
                />
                <ProductCategory className = "col-span-3"/>
            </div>
        </>
    )
}
