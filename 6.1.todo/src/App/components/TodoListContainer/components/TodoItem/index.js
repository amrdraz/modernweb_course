import React from 'react'
import './style.css'

let TodoItem = props => (<div className="todo-item">
  <input onChange={props.onToggleDone(props.index, props.done)} className="todo-item__done" type="checkbox" checked={props.done} />
  <span className="todo-item__text">{props.text}</span>
  <button onClick={props.onRemoveItem(props.index)} className="todo-item__delete-btn">x</button>
</div>)

export default TodoItem
