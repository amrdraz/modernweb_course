import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

const TodoListTitle = (props) => (
  <Link to={`/list/${props.list.id}`}  className="todo-list-title row">
    <span className="todo-list-title__title">{props.list.title}</span>
    <button onClick={props.onRemove(props.list.id)} className="todo-list-title__delete-btn">x</button>
  </Link>
)

export default TodoListTitle
