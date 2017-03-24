import React, { Component } from 'react';

import TodoItem from './components/TodoItem'
import CreateItem from './components/CreateItem'

import './style.css';

export default class TodoList extends Component {

  state = {
    items: []
  }

  render() {
    let { items } = this.state
    return (<main className="col f-3">
      <CreateItem onAddItem={this.addItem}/>
      <ul className="todo-list col">
        {items.map((item, index)=>(
          <li key={item.text} className="todo-list__item">
            <TodoItem
              item={item}
              index={index}
              onToggleDone={this.toggleDone}
              onRemoveItem={this.removeItem}
            />
          </li>
        ))}
      </ul>
    </main>);
  }

  componentWillMount() {
    this.setState({
      items: this.props.list.items
    });
  }
  addItem = (item) => {
    this.setState((state)=>({
      items: [...state.items, item]
    }))
  }
  removeItem = (index) => () => {
    this.setState((state)=>({
      items: [...state.items.splice(0, index), ...state.items.splice(index + 1)]
    }))
  }
  toggleDone = (index, done) => () => {
    this.setState((state)=>({
      items: state.items.map((item, i)=>{
        if (i===index) {
          return {...item, done: !done}
        }
        return item
      })
    }))
  }
}
