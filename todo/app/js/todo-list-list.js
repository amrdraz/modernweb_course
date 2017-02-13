(function functionName(global) {
  let Observer = global.Observer;
  global.TodoListList = {
      state: {},
      render(todo_list_list) {
        return `
        <button type="button" class="create-list secondary-bg-color ">Create New List</button>
        <ul class="todo-list-list">
            ${todo_list_list.map((list, i)=>{
              return `<li class="todo-list-list__item primary-bg-color">
                <div class="todo-list-list__todo-list row">
                  <span class="todo-list-list__title">${list.title}</span>
                  <button class="todo-list-list__delete-btn">x</button>
                </div>
              </li>`
            }).join("")}
        </ul>
        `
      }
    }
})(window)
