import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ProductContext from '../../../context/product/ProductContext';

export const Checkbox = ({marca}) => {
    
    const params = useParams();
    const {state, setFilters, getProductsForFilters} = useContext(ProductContext);
    const stateFilters = state.filters;

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (state.filters.length === 0) {
            setChecked(false);
        }
    }, [state.filters])

    const handleCheck = (e) => {
        setChecked(e.target.checked);
        const currentIndex = stateFilters.indexOf(e.target.name);
        if (e.target.checked) {
            stateFilters.push(e.target.name);
        }else{
            stateFilters.splice(currentIndex, 1);;           
        } 
        setFilters(stateFilters);
        getProductsForFilters(params.category);
    }

    return (
        <div className = "flex items-center my-2" key = {marca}>
            <input 
                type="checkbox" 
                className = "mr-2 h-5 w-5"
                name={marca} 
                id={marca} 
                onChange = {handleCheck}
                value = {marca}
                checked = {checked}
            />
            <label htmlFor={marca} className = "text-lg">{marca}</label>
        </div>
    )
}
