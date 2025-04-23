import React from 'react'
import "./Modal.css"
import { useTodo } from '../../context/TodoContext'

const Modal = () => {
    const {setModal}=useTodo()
  return (
    <div className='modal' onClick={()=>{
        setModal(false)
    }}>
        <div className='modalContent' onClick={(e)=>e.stopPropagation()}>
            <button onClick={(e)=>{
                setModal(false)
            }}>&times;</button>
            <span>Please enter a task</span>
        </div>
    </div>
  )
}

export default Modal