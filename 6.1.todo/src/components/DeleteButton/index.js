import React from 'react'
import './style.css'


const DeleteButton = (props) => <button onClick={props.onRemove(props.identifyer)} className="todo-item__delete-btn">x</button>

export default DeleteButton
