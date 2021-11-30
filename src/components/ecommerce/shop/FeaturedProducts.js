import React, { useContext, useEffect } from "react";
import ProductContext from "../../../context/product/ProductContext";
import { SkeletonUi } from "../../ui/SkeletonUi";
import { Product } from "./Product";

export const FeaturedProducts = () => {

  const {state, clearSearch} = useContext(ProductContext);

    useEffect(() => {
      clearSearch();
    }, [])

  return (
    <div className="container mx-auto max-w-7xl border p-5 rounded-lg bg-gray-500 right-0 left-0 mt-5">
        {
          state.search 
          ? <div className = "text-center">
              <h1 className = "text-center text-4xl font-bold text-white">Tu busqueda : " {state.search} "</h1>
              <p className = "text-xl font-semibold my-4"> Filtrados : 
                  <span className = "bg-gray-400 rounded-lg p-2 text-lg font-light ml-3">
                  { state.filteredProducts.length }  Productos
                  </span>
              </p>
            </div>
          : <div>
              <h1 className = "text-center text-4xl font-bold text-white">Productos Destacados</h1>
              <p className = "text-center text-lg mt-1 text-white">Los productos que nuestros clientes eligen</p>
            </div>
        }
        
        <div className = "grid lg:grid-cols-4 md:grid-cols-3 gap-3 bg-gray-300 mt-8 rounded-md p-2 relative">
          {
            state.loading 
            ? <SkeletonUi />
            
            : state.filteredProducts
              && state.filteredProducts.map( product => {
                  return (
                    <Product 
                      key = {product.id}
                      product = {product}
                    />  
                  )
              })     
          }
          
        </div>
    </div>
  );
};
