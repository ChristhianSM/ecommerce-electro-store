import React, { useContext, useState } from 'react'
import {IoAddCircleSharp, IoRemoveCircleSharp} from 'react-icons/io5'
import ProductContext from '../../context/product/ProductContext';

export const ShoppingCartProduct = ({product}) => {
    // Estado de la aplicacion
    const {removeProductShoppingCart, updateAmountShoppingCart} = useContext(ProductContext);

    // useState para modificar la cantidad de los productos
    const [amount, setAmount] = useState(product.amount);

    const handleRemoveProduct = (product) => {
        removeProductShoppingCart(product.id);
    }

    const handleAmountProduct = (e) => {
        setAmount(e.target.value)
        updateAmountShoppingCart(product.id, amount);
    }

    const handleDecrementAmount = () => {
        if (amount > 1) {
            setAmount(amount-1);
            updateAmountShoppingCart(product.id, amount - 1);
        }
    }
    
    const handleIncrementAmount = () => {
        if (amount < product.stock) {
            setAmount(amount + 1);
            updateAmountShoppingCart(product.id, amount + 1);
        }
    }

    return (
        <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 animate__animated animate__bounceInLeft" >
            <div className="flex w-2/5"> 
                <div className="w-44">
                    <img className="h-24 w-full object-contain" src={product.thumbnail} alt="" />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{product.title}</span>
                        <span className="text-red-500 text-xs">{product.marca}</span>
                        <button 
                            className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                            onClick = {() => {
                                handleRemoveProduct(product)
                            }}
                        >Remove</button>
                </div>
            </div>
            <div className="flex justify-center w-1/5">
                <button >
                    <IoRemoveCircleSharp className = "text-3xl" onClick = {handleDecrementAmount}></IoRemoveCircleSharp>
                </button>

                <input 
                    className="mx-2 border text-center w-8" 
                    name = "amount"
                    type="text" 
                    value={amount} 
                    onChange = { handleAmountProduct}
                />

                <button>
                    <IoAddCircleSharp className = "text-3xl" onClick = {handleIncrementAmount}></IoAddCircleSharp>
                </button>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm">S./ {product.price}</span>
            <span className="text-center w-1/5 font-semibold text-sm">S/. {product.price * product.amount}</span>
        </div>
    )
}
