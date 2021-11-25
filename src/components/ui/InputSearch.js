import React, { useContext, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useHistory } from 'react-router';
import ProductContext from '../../context/product/ProductContext';

export const InputSearch = () => {
    const history = useHistory();
    const {getProductsForSearch} = useContext(ProductContext);

    const [input, setInput] = useState("");

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getProductsForSearch(input.toLowerCase());
        setInput("")
        history.push(`/search/${input}`)
    }
    return (
        <form 
            className = "search shadow-2xl flex w-1/3 animate__animated animate__fadeIn relative"
            onSubmit = {handleSubmit}
        >
            <input 
                className="w-full p-2 pl-4 outline-none rounded-lg text-black" 
                type="text" 
                placeholder="Search products..."
                value = {input}
                onChange = {handleInput}
            />
            <button 
                type = "submit"
                className="bg-gray-500 text-white w-auto flex justify-end items-center text-lg font-bold h-full px-3 hover:text-blue-400 absolute top-0 right-0 rounded-tr-lg rounded-br-lg">
                <BsSearch></BsSearch>
            </button>
        </form>
    )
}
