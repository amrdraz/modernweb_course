$injector.inject('TodoItem', function () {
    return {
      render(item) {
        return `<div class="todo-item">
          <input onclick="TodoList.toggleDone(${item.index}, ${item.done})" class="todo-item__done" type="checkbox" ${item.done?'checked':''} >
          <span class="todo-item__text">${item.text}</span>
          <button onclick="TodoList.removeItem(${item.index})" class="todo-item__delete-btn">x</button>
        </div>`
      }
    }
})
