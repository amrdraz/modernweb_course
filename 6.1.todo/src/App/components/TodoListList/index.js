import React, { Component } from 'react'

import './style.css'

import TodoListTitle from './components/TodoListTitle'

import actions from './actions'

export default class TodoListList extends Component {

  render() {
    let {todo_list_list} = this.props

    return (
      <sidebar className="navigation col f-1">
        <button onClick={this.createList} type="button" className="create-list secondary-bg-color ">Create New List</button>
        <ul className="todo-list-list">
            {todo_list_list.map((list, i)=> (
              <li key={list.title} className="todo-list-list__item primary-bg-color">
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

  createList = () => {
    let title = prompt("Enter list name")
    actions.createList(title)
  }

  selectList = (index) => (event) => {
    event.preventDefault()
    actions.selectList(index)
  }

  removeList = (index) => (event) => {
    event.preventDefault()
    actions.removeList(index)
  }

}
