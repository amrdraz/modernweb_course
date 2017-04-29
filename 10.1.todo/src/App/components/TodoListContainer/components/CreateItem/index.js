import React, {Component} from 'react'

import './style.css'

export default class CreateItem extends Component {

  state = { text: "" }

  render() {
    return (<form className="row create-item" onSubmit={this.addItem}>
      <input onChange={this.inputChange} value={this.state.text} type="text" className="create-item__input" placeholder="Enter New To Do"/>
      <button onClick={this.addItem} type="button" className="create-item__submit-btn secondary-bg-color ">+</button>
    </form>)
  }

  inputChange = (e) =>{
    let text = e.target.value
    this.setState((prevState)=>({
      text
    }))
  }

  addItem = (event) => {
    event.preventDefault()
    let { text } = this.state
    this.props.onAddItem({
      text,
      done: false
    })
    this.setState(()=>({
      text:""
    }))
  }
}
