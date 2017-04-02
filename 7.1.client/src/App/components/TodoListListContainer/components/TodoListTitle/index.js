import React from 'react'

import './style.css'

const TodoListTitle = (props) => (
  <div onClick={props.onSelect(props.list)} className="todo-list-title row">
    <span className="todo-list-title__title">{props.list.title}</span>
    <button onClick={props.onRemove(props.list.id)} className="todo-list-title__delete-btn">x</button>
  </div>
)

export default TodoListTitle
