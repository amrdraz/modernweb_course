import React, { Component } from 'react'

import DS from '~/src/data-store'
import StateStore from '~/src/state-store'

import {addItem, removeItem, toggleDone} from './actions'

import TodoItem from './components/TodoItem'
import CreateItem from './components/CreateItem'

import './style.css';

export default class TodoList extends Component {
  state = {
    todo_lists: null,
    selected_list: null,
    items: []
  }
  render() {
    let { items, selected_list, todo_lists } = this.state
    return (selected_list?
      <main className="col f-3">
        <CreateItem onAddItem={this.addItem.bind(this)}/>
        {items.length?
          <ul className="todo-list col">
            {items.map((item, index)=>(
              <li key={item.text+index} className="todo-list__item">
                <TodoItem
                  item={item}
                  onToggleDone={this.toggleDone}
                  onRemoveItem={this.removeItem}
                />
              </li>
            ))}
          </ul>
        :
          <div className="col f-1 f-center f-middle">
            <h1>Add an Item</h1>
          </div>
        }
      </main>
    :
      <main className="col f-3 f-center f-middle">
        <h1>Add{todo_lists&&todo_lists.length?` or Select `:` `}a List</h1>
      </main>
    );
  }
  componentWillMount() {
    this.unsubscribeFromStateStore = StateStore.subscribe((state)=>{
      this.setState(() => ({
        todo_lists: state.todo_list_list,
        selected_list : state.selected_list,
        items: state.items
      }))
    })
  }
  componentWillUnmount() {
    this.unsubscribeFromStateStore()
  }
  addItem(item) {
    item.list_id = this.state.selected_list.id
    DS.create('TodoItem', item).then(item=>{
      StateStore.dispatch(addItem(item))
    })
  }
  removeItem = (id) => () => {
    DS.delete('TodoItem', id).then(_=>{
      StateStore.dispatch(removeItem(id))
    })
  }
  toggleDone = (item) => () => {
    DS.update('TodoItem', item.id, {done: !item.done}).then(item=>{
      StateStore.dispatch(toggleDone(item))
    })
  }
}
