import React, { useState } from 'react'
import { ShoppingCartFavoritesWindow } from './ShoppingCartFavoritesWindow'
import { ShoppingCartWindow } from './ShoppingCartWindow'

export const ShoppingCartModal = ({setModal, modal}) => {

    const [windowComponent, setWindowComponent] = useState({
        shoppingCart : true,
        shoppingCartFavorites : false,
    })
    
  return (
    <div className="overlay w-screen h-screen fixed top-0 left-0 text-black">
          <div className="contenedor-modal animate__animated animate__bounceInRight">
            <div className="flex flex-col max-w-3xl p-2 space-y-4 sm:p-1 sm:pb-6 bg-coolGray-50 text-coolGray-800 relative h-screen">
                <div className = "flex justify-around">
                    <button 
                        className={`text-xl font-semibold w-full text-purple-600 pb-2 ${windowComponent.shoppingCart && "border-b-2 border-purple-700"}`}
                        onClick = {() => {
                            setWindowComponent({
                                shoppingCart : true,
                                shoppingCartFavorites : false,
                            })
                        }}
                    >Your cart</button>
                    <button 
                        className={`text-xl font-semibold text-purple-600 w-full pb-2 ${windowComponent.shoppingCartFavorites && "border-b-2 border-purple-700"}`}
                        onClick = {() => {
                            setWindowComponent({
                                shoppingCart : false,
                                shoppingCartFavorites : true,
                            })
                        }}
                    >Favorites</button>
                </div>
                {
                    windowComponent.shoppingCart 
                    &&
                    <ShoppingCartWindow 
                        setModal = {setModal}
                        modal = {modal}
                    />
                }
                {
                    windowComponent.shoppingCartFavorites 
                    && <ShoppingCartFavoritesWindow 
                            setModal = {setModal}
                            modal = {modal}
                    />
                }
            </div>
          </div>   
      </div> 
  )
}
