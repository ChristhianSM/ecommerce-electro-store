import React from 'react'
import Modal from "react-modal";

const  customStyles  =  { 
    content : { 
      width :"120px",
      top : '40%' , 
      left : '50%' , 
      right : 'auto' , 
      bottom : 'auto' , 
      marginRight : '-50%' , 
      transform : 'translate (-50%, -50%) ', 
    } , 
  } ;

export const ModalImgProduct = ({isOpen, closeModal}) => {
    return (
        <div>
            <Modal 
                isOpen = { isOpen } 
                onRequestClose = { closeModal } 
                style = { customStyles } 
                contentLabel = "Example Modal" 
            > 
                <h2> Hola </ h2 > 
                <button  onClick = { closeModal } > close </button> 
                <div > Soy un modal </div> 
                <form > 
                <input  /> 
                <button > navegación de pestañas </ button > 
                < button> permanece </ button > 
                < button > dentro de </ button > 
                < button > el modal </ button > 
                </form> 
            </Modal> 
        </div>
    )
}
