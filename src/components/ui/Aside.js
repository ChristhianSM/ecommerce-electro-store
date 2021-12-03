import React, { useContext } from 'react'
import {GoSettings} from 'react-icons/go'
import { SpinnerCircularFixed } from 'spinners-react';
import ProductContext from '../../context/product/ProductContext';
import { Checkbox } from '../ecommerce/shop/Checkbox';
import { RangePrices } from './RangePrices';

export const Aside = ({category, marcas, prices}) => {
    const {state:stateProducts} = useContext(ProductContext);
    return (
        <aside className = "col-span-1 animate__animated animate__fadeInLeft">
            {/* {
                stateProducts.loading ? 
                <div className = "flex justify-start items-center  w-full h-96">
                    <SpinnerCircularFixed size={50} thickness={100} speed={100} color="rgba(142, 57, 172, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" className = "mx-auto" />
                </div>
                :
                <> */}
                     <h2 className = "font-bold text-3xl bg-gray-300 p-3 border-l-8 border-purple-600">{category}</h2>

                    <div className="filtros mt-5 bg-gray-300 p-3 px-6">
                        <div className= "flex items-center">
                            <GoSettings className = "mr-3 text-xl"></GoSettings>
                            <h2 className = "text-2xl">Filtros</h2>
                        </div>

                        <div className="marca my-4 ">
                            <h3 className = "text-lg font-bold">Marca</h3>
                            <div className = "overflow-y-auto max-h-52 style-1">
                                {   
                                
                                marcas.map( (marca, index) => {
                                        return (
                                            <Checkbox 
                                                key = {index}
                                                name = {marca}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {  
                            prices.lowerPrice > 0 &&
                            <RangePrices 
                                prices = {prices}
                                category = {category}
                            />
                        }
                    </div>    
                {/* </>
            } */}
           
        </aside>
    )
}
