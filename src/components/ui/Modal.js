import React, { useContext, useEffect } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import AuthContext from '../../context/auth/AuthContext';
import ModalContext from '../../context/modal/ModalContext';
import ProductContext from '../../context/product/ProductContext';
import { ModalOrder } from './modals/ModalOrder';
import { ShoppingCartModal } from './ShoppingCartModal';

export const Modal = () => {

    const {state:stateModal, changeStateModalShoppingCart, animationsModalShoppingCart, changeStateModalOrder, changeStateModalProduct} = useContext(ModalContext);
    const {state:{shoppingCart}} = useContext(ProductContext);
    const {state:stateAuth} = useContext(AuthContext);

    useEffect(() => {
        animationsModalShoppingCart(true);
        setTimeout(() => {
            animationsModalShoppingCart(false);
        }, 2000);
    }, [shoppingCart])

    return (
        <div>
            {
                stateModal.modalShoppingCart &&
                <ShoppingCartModal 
                    modal = {stateModal.modalShoppingCart}
                    setModal = {changeStateModalShoppingCart}
                    className = "animate__animated animate__bounce"
                />
            }

            {
                stateModal.modalOrder && 
                <ModalOrder
                    order = {stateAuth.activeOrder}
                    setIsOpen = {changeStateModalOrder}
                />   
            }
            {
                stateModal.modalImgProduct &&
                <div className = "w-full h-full bg-black fixed top-0 left-0 flex justify-center items-center bg-opacity-70 z-10">
                    <div className = "w-3/5 h-3/5 rounded-lg animate__animated animate__zoomIn relative bg-white p-5" >
                        <div className = "flex justify-between items-center mb-10">
                            <p className = "font-semibold text-2xl text-purple-500 ">{stateModal.dataProduct.title}</p>
                            <button 
                                type="button" 
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-purple-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                onClick = {() => changeStateModalProduct(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <AiOutlineCloseCircle className = "text-2xl "></AiOutlineCloseCircle>
                            </button>
                        </div>
                        <img src={stateModal.dataProduct.thumbnail} alt="" className = "object-contain h-4/5 mx-auto" />
                    </div>
                </div>
            }
        </div>
    )
}
