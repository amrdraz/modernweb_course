import React, { Component } from 'react';

import DS from '~/src/data-store';
import StateStore from '~/src/state-store';

import { loadState } from './actions'

import Header from './components/Header'
import TodoList from './components/TodoListContainer'
import TodoListList from './components/TodoListListContainer'


class App extends Component {
  componentWillMount() {
    DS.findAll('TodoList', {}).then((todo_list_list)=>{
      StateStore.dispatch(loadState(todo_list_list))
    })
  }
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
