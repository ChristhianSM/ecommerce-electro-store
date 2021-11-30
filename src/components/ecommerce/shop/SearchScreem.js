import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ProductContext from '../../../context/product/ProductContext';
import { getMarcasForSearch } from '../../../firebase/firebaseData';
import { orderProducts } from '../../../helpers/functions';
import { AsideSearch } from '../../ui/AsideSearch';
import { NavBar } from '../../ui/NavBar';
import { ProductsCategory } from './ProductsCategory';

export const SearchScreem = () => {

    const params = useParams();
    const {state, getProductsForOrder, deleteFilter} = useContext(ProductContext);

    const [marcas, setMarcas] = useState([]);
    const [categories, setCategories] = useState([]);
    const [prices, setPrices] = useState({
        higherPrice: 0,
        lowerPrice: 0
    })

    useEffect(() => {
        deleteFilter();
        // Cuando carga el componente por una nueva busqueda en el parametro, traemos las marcas de dicha busqueda
        const getMarcasFirebase = async () => {
            const [marcas, categories, , higherPrice, lowerPrice] = await getMarcasForSearch(params.query);
            setMarcas(marcas);
            setCategories(categories)
            setPrices({
                higherPrice,
                lowerPrice
            })
        }   
        getMarcasFirebase();

    }, [params])

    const handleSelect = (e) => {
        const productosOrdenados = orderProducts(state.filteredProducts, e.target.value); 
        getProductsForOrder(productosOrdenados);               
    }
    return (
        <>
            <NavBar />
            <div className="grid grid-cols-4 container mx-auto max-w-7xl py-10 gap-3 mt-40">
                <div className = "col-span-4 flex justify-between items-end border-b border-gray-400 pb-3">
                    <p className = "text-xl font-semibold"> Filtrados : 
                        <span className = "bg-gray-400 rounded-lg p-2 text-lg font-light ml-3">
                        { state.filteredProducts.length }  Productos
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
                <AsideSearch
                    category = {(params.query).toUpperCase()}
                    marcas = {marcas}
                    categories = {categories}
                    prices = {prices}
                />
                <ProductsCategory 
                    className = "col-span-3"
                />
            </div>
        </>
    )
}
