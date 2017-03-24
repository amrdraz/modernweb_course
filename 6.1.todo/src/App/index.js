import React, { Component } from 'react';

import Header from './components/Header'
import TodoList from './components/TodoList'
import TodoListList from './components/TodoListList'

class App extends Component {
  render() {
    let {todo_list_list, selected_list} = this.props.state
    return (
      <app>
        <Header>To Do App</Header>
        <div className="row">
            <TodoListList todo_list_list={todo_list_list} selected_list={selected_list} />
            {todo_list_list[selected_list] &&
              <TodoList list={todo_list_list[selected_list]} />
            }
        </div>
      </app>
    );
  }
}

export default App;
