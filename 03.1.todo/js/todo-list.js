

(function (global) {
  let {Observer} = global;

  global.TodoList = {
        state: {},
        render(list) {
          return `
          <div class="row create-todo">
            <input type="text" class="create-todo__input" placeholder="Enter New To Do">
            <button type="button" class="create-todo__submit-btn secondary-bg-color ">+</button>
          </div>
          <ul class="todo-list col">
            ${list.items.map((item, i)=>(
              `<li class="todo-list__item">
                ${TodoItem.render({
                  text: item.text,
                  done: item.done
                })}
              </li>`
              )).join("")}
          </ul>`
        }
    }
})(window)
