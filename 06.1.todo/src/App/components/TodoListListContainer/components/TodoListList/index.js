import React, { Component } from 'react'

import './style.css'

import TodoListTitle from '../TodoListTitle'

export default class TodoListList extends Component {

  createList = () => {
    let title = prompt("Enter list name")
    this.props.addList(title)
  }

  selectList = (index) => (event) => {
    event.preventDefault()
    this.props.selectList(index)
  }

  removeList = (index) => (event) => {
    event.preventDefault()
    this.props.removeList(index)
  }
  render() {
    let {todo_list_list} = this.props
    return (
      <sidebar className="navigation col f-1">
        <button onClick={this.createList} type="button" className="create-list secondary-bg-color ">Create New List</button>
        <ul className="todo-list-list">
            {todo_list_list.map((list, i)=> (
              <li key={list.title+i} className="todo-list-list__item primary-bg-color">
                <TodoListTitle
                  title={list.title}
                  index={i}
                  onSelect={this.selectList}
                  onRemove={this.removeList}
                />
              </li>
            ))}
        </ul>
      </sidebar>
    )
  }

}
