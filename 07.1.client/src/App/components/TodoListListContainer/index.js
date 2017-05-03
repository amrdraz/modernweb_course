import React, { Component } from 'react'

import StateStore from '~/src/state-store'
import DS from '~/src/data-store'

import { addList, removeList, selectList } from './actions'

import TodoListTitle from './components/TodoListTitle'

import './style.css'

export default class TodoListList extends Component {
  state = {
    todo_list_list: []
  }
  render() {
    let {todo_list_list} = this.state
    return (
      <sidebar className="navigation col f-1">
        <button onClick={this.createList} type="button" className="create-list secondary-bg-color ">Create New List</button>
        <ul className="todo-list-list">
            {todo_list_list.map((list)=> (
              <li key={list.id} className="todo-list-list__item primary-bg-color">
                <TodoListTitle
                  list={list}
                  onSelect={this.selectList}
                  onRemove={this.removeList}
                />
              </li>
            ))}
        </ul>
      </sidebar>
    )
  }
  componentWillMount() {
    this.unsubscribeFromStateStore = StateStore.subscribe((state)=>{
      this.setState(() => ({ todo_list_list : state.todo_list_list}))
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromStateStore()
  }
  createList = () => {
    let title = prompt("Enter list name")
    if (title) {
      DS.create('TodoList', {
        title
      }).then(list=>{
        StateStore.dispatch(addList(list))
      })
    }
  }

  selectList = (list) => (event) => {
    event.preventDefault()
    event.stopPropagation()
    DS.findAll('TodoItem', { list_id: list.id }).then(items=>{
      StateStore.dispatch(selectList(list, items))
    })
  }

  removeList = (id) => (event) => {
    event.preventDefault()
    event.stopPropagation()
    DS.delete('TodoList', id).then(list=>{
      StateStore.dispatch(removeList(id))
    })
  }


}
