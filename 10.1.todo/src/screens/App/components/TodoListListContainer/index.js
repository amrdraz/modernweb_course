import React, { Component } from 'react'

import StateStore from '~/src/state-store'

import firebase from '~/src/firebase'

import { addList, removeList, loadLists } from './actions'

import TodoListTitle from './components/TodoListTitle'

import './style.css'

const todo_list_list = firebase.database().ref('todo_list_list');

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
                  selected={this.props.match&&this.props.match.params.list}
                  list={list}
                  onRemove={this.removeList}
                />
              </li>
            ))}
        </ul>
      </sidebar>
    )
  }
  componentWillMount() {
    todo_list_list.on('child_added', this.onListAdd)
    todo_list_list.on('child_removed', this.onListRemove)
    // todo_list_list.once('value', this.onLoadLists)

    this.unsubscribeFromStateStore = StateStore.subscribe((state)=>{
      this.setState(() => ({ todo_list_list : state.todo_list_list}))
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromStateStore()
    todo_list_list.off('child_added', this.onListAdd)
    todo_list_list.off('child_removed', this.onListRemove)
  }

  onLoadLists = listsSnap => {
    let lists = listsSnap.val()
    if(lists && Object.keys(lists).length!==0) {
      lists = Object.keys(lists).map(key => ({...lists[key], id:key}))
      StateStore.dispatch(loadLists(lists))
    }
  }

  onListAdd = listSnap => {
    StateStore.dispatch(addList({...listSnap.val(), snap:listSnap, id: listSnap.key}))
  }
  onListRemove = listSnap => {
    StateStore.dispatch(removeList(listSnap.key))
  }

  createList = () => {
    let title = prompt("Enter list name")
    if (title) {
      let listSnape = todo_list_list.push()
      listSnape.set({
        title
      })
    }
  }

  // selectList = (list) => (event) => {
  //   event.preventDefault()
  //   event.stopPropagation()
  //   this.props.history.push(`/list/${list.id}`)
  //   // StateStore.dispatch(selectList(list))
  // }

  removeList = (id) => (event) => {
    event.preventDefault()
    event.stopPropagation()
    todo_list_list.child(id).remove()
  }


}
