import React, { Component } from 'react'
// import DS from '~/src/data-store'
import StateStore from '~/src/state-store'

import firebase from '~/src/firebase'

import {addItem, removeItem, updateItem, loadItems} from './actions'

import TodoItem from './components/TodoItem'
import CreateItem from './components/CreateItem'

import './style.css';

export default class TodoList extends Component {
  state = {
    todo_lists: null,
    items: []
  }
  render() {
    let { items, todo_lists, selected_list } = this.state
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
    let selected_list = this.props.match.params.list
    if(selected_list) {
      this.items = firebase.database().ref(`todo_items/${selected_list}`)
      this.subscribeToItems(selected_list)
      this.items.once('value', itemsSnap=>{
        let items = itemsSnap.val()
        StateStore.dispatch(loadItems(items?Object.keys(items).map(key => ({...items[key], id:key})):[]))
      })
      this.setState(()=>({
        selected_list
      }))
    }
    this.unsubscribeFromStateStore = StateStore.subscribe((state)=>{
      this.setState(() => ({
        todo_lists: state.todo_list_list,
        items: state.items
      }))
    })
  }
  componentWillReceiveProps(nextProps){
    let selected_list = this.props.match.params.list
    let next_selected_list = nextProps.match.params.list
    if(selected_list && selected_list !== next_selected_list) {
      if(this.items) {
        this.items.off('child_added', this.onAddItem)
        this.items.off('child_removed', this.onRemoveItem)
        this.items.off('child_changed', this.onChangeItem)
      }
      this.subscribeToItems(next_selected_list)
      this.setState(() => ({
        selected_list: next_selected_list
      }))
    }
  }
  componentWillUnmount() {
    this.unsubscribeFromStateStore()
  }
  subscribeToItems(key) {
    this.items = firebase.database().ref(`todo_items/${key}`)
    this.items.on('child_added', this.onAddItem)
    this.items.on('child_removed', this.onRemoveItem)
    this.items.on('child_changed', this.onChangeItem)
  }
  onAddItem = itemSnap => {
    StateStore.dispatch(addItem({...itemSnap.val(), id: itemSnap.key}))
  }
  onRemoveItem = itemSnap => {
    StateStore.dispatch(removeItem(itemSnap.key))
  }
  onChangeItem = itemSnap => {
    StateStore.dispatch(updateItem({...itemSnap.val(), id: itemSnap.key}))
  }

  addItem(item) {
    this.items.push().set(item)
  }
  removeItem = (id) => () => {
    this.items.child(id).remove()
  }
  toggleDone = (item) => () => {
    this.items.child(`${item.id}/done`).set(!item.done)
  }
}
