import React, { useContext, useEffect } from "react";
// import { SpinnerCircular, SpinnerDotted } from "spinners-react";
import ProductContext from "../../../context/product/ProductContext";
import { Product } from "./Product";

export const FeaturedProducts = () => {

  const {state, loadFeaturedProducts} = useContext(ProductContext);

    useEffect(() => {
      loadFeaturedProducts();
  }, [])

  return (
    <div className="container mx-auto max-w-7xl border p-5 rounded-lg bg-gray-500 right-0 left-0 mt-48">
        <h1 className = "text-center text-4xl font-bold text-white">Productos Destacados</h1>
        <p className = "text-center text-lg mt-1 text-white">Los productos que nuestros clientes eligen</p>
        <div className = "grid lg:grid-cols-4 md:grid-cols-3 gap-3 bg-gray-300 mt-8 rounded-md p-2 relative">
       
          { state.featuredProducts &&
            state.featuredProducts.map( product  => {
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
