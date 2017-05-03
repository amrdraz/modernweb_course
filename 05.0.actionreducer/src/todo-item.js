let React = require('react')

exports.TodoItemString = {
    render(item) {
      return `<div class="todo-item">
        <input onclick=${item.toggleDone} class="todo-item__done" type="checkbox" ${item.done?'checked':''} />
        <span class="todo-item__text"></span>
        <button onclick=${item.removeItem} class="todo-item__delete-btn">x</button>
      </div>`
    }
}

exports.TodoItemJSX = {
    render(item) {
      return (<div class="todo-item">
        <input onclick={item.toggleDone} class="todo-item__done" type="checkbox"  />
        <span class="todo-item__text">{item.text}</span>
        <button onclick={item.removeItem} class="todo-item__delete-btn">x</button>
      </div>)
    }
}
