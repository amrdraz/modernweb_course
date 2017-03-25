import React, { Component } from 'react';

import TodoItem from '../TodoItem'
import CreateItem from '../CreateItem'

import './style.css';

export default class TodoList extends Component {
  render() {
    let { props } = this
    return props.empty && (<main className="col f-3">
        <CreateItem onAddItem={props.addItem}/>
        <ul className="todo-list col">
          {props.items.map((item, index)=>(
            <li key={item.text+index} className="todo-list__item">
              <TodoItem
                {...item}
                index={index}
                onToggleDone={props.toggleDone}
                onRemoveItem={props.removeItem}
              />
            </li>
          ))}
        </ul>
    </main>);
  }
}
