$injector.inject('TodoItem', function () {
    return {
      render(item) {
        return (<div class="todo-item">
          <input onclick={item.toggleDone} class="todo-item__done" type="checkbox" checked={item.done} />
          <span class="todo-item__text">{item.text}</span>
          <button onclick={item.removeItem} class="todo-item__delete-btn">x</button>
        </div>)
      }
    }
})
