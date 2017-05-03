import React from 'react'
import './style.css'

let TodoItem = props => (<div className="todo-item">
  <input onChange={props.onToggleDone(props.item)} className="todo-item__done" type="checkbox" checked={props.item.done} />
  <span className="todo-item__text">{props.item.text}</span>
  <button onClick={props.onRemoveItem(props.item.id)} className="todo-item__delete-btn">x</button>
</div>)

export default TodoItem
