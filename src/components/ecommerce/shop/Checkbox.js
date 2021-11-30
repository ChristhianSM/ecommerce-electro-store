import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ProductContext from '../../../context/product/ProductContext';

export const Checkbox = ({name, count}) => {
    
    const params = useParams();
    const {state, setFilters, getProductsForFilters, getProductsForFiltersSearch} = useContext(ProductContext);
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
        if (params.category) {
            getProductsForFilters(params.category);
        }else{
            getProductsForFiltersSearch();
        }
    }

    return (
        <div className = "flex items-center my-2 mr-2">
            <input 
                type="checkbox" 
                className = "mr-2 h-5 w-5"
                name={name.name} 
                id={name.name} 
                onChange = {handleCheck}
                value = {name.name}
                checked = {checked || (count && true)}
                disabled = {count && true}
            />
            <label htmlFor={name.name} className = "text-lg  cursor-pointer flex justify-between w-full">
                {name.name}
                <span className = "bg-white w-8 text-center rounded-lg text-sm leading-loose h-8">{name.count}</span>
            </label>
        </div>
    )
}
