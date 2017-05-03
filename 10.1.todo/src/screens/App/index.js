import React, { Component } from 'react';
// import firebase from 'firebase'

// import StateStore from '~/src/state-store';

// import { loadState } from './actions'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import TodoList from './components/TodoListContainer'
import TodoListList from './components/TodoListListContainer'


class App extends Component {
  componentWillMount() {
    // this.unsubscribeFromStateStore = StateStore.subscribe((state)=>{
    //   if(this.props.location!==state.url) {
    //     this.props.history.push(state.url)
    //   }
    // })
  }
  componentWillUnmount() {
    this.unsubscribeFromStateStore()
  }
  render() {
    return (
      <app>
        <Header>To Do App</Header>
        <Router history={true}>
          <div className="row">
              <TodoListList/>
              <Switch>
                <Route path="/list/:list" component={TodoList}/>
                <Route path="/" component={TodoList}/>
              </Switch>
          </div>
        </Router>
      </app>
    );
  }
}

export default App;
