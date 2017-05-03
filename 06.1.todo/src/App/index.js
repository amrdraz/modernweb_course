import React, { Component } from 'react';

import Header from './components/Header'
import TodoList from './components/TodoListContainer'
import TodoListList from './components/TodoListListContainer'

class App extends Component {
  render() {
    return (
      <app>
        <Header>To Do App</Header>
        <div className="row">
            <TodoListList/>
            <TodoList/>
        </div>
      </app>
    );
  }
}

export default App;
