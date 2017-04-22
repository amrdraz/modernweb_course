import React, { Component } from 'react';
import socket from '~/src/socket'

import Messages from './components/Messages'

class App extends Component {
  render() {
    return (
      <app>
        <Messages />
        <form onSubmit={this.sendMessage}>
          <input ref={(input)=> this.input = input } autoComplete="off" />
          <button onClick={this.sendMessage} >Send</button>
        </form>
      </app>
    );
  }
  sendMessage = (event) => {
    event.preventDefault();
    socket.emit('chat message', this.input.value);
    this.input.value = ''
  }
}

export default App;
