import React, { Component } from 'react'

import DS from '~/src/data-store'
import StateStore from '~/src/state-store'

import {addItem, removeItem, toggleDone} from './actions'

import TodoItem from './components/TodoItem'
import CreateItem from './components/CreateItem'

import './style.css';

export default class TodoList extends Component {
  state = {
    list: null
  }
  render() {
    let { list } = this.state
    return (list
      ?<main className="col f-3">
        <CreateItem onAddItem={this.addItem.bind(this)}/>
        <ul className="todo-list col">
          {list.items.map((item, index)=>(
            <li key={item.text+index} className="todo-list__item">
              <TodoItem
                item={item}
                onToggleDone={this.toggleDone}
                onRemoveItem={this.removeItem}
              />
            </li>
          ))}
        </ul>
      </main>
      :<main className="col f-3">
        <h1>Add a List</h1>
      </main>
    );
  }
  componentWillMount() {
    this.unsubscribeFromStateStore = StateStore.subscribe((state)=>{
      this.setState(() => ({ list : state.selected_list}))
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromStateStore()
  }
  addItem(item) {
    let list = this.state.list
    item.list_id = this.state.list.id
    DS.create('TodoItem', item).then(item=>{
      // relation update should be handled by the adapter
      list.items.push(item)
      this.forceUpdate()
      // StateStore.dispatch(addItem(item))
    })
  }
  removeItem = (id) => () => {
    let list = this.state.list
    DS.delete('TodoItem', id).then(_=>{
      // relation update should be handled by the adapter
      list.items = list.items.filter((item)=>item.id!==id)
      // StateStore.dispatch(removeItem(id))
      this.forceUpdate()
    })
  }
  toggleDone = (item) => () => {
    DS.update('TodoItem', item.id, {done: !item.done}).then(item=>{
      this.forceUpdate()
      // StateStore.dispatch(toggleDone(item))
    })
  }
}
