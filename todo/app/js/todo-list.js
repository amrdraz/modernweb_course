

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
                <div class="todo-item">
                  <input class="todo-item__done" type="checkbox" ${item.done?'checked':''} >
                  <span class="todo-item__text">${item.text}</span>
                  <button class="todo-item__delete-btn">x</button>
                </div>
              </li>`
              )).join("")}
          </ul>`
        }
    }
})(window)
