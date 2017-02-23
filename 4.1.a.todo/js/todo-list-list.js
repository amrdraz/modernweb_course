(function functionName(global) {
  let Observer = $injector.get('Observer')
  global.TodoListList = {
      render(todo_list_list) {
        return `
        <button onclick="TodoListList.createList()" type="button" class="create-list secondary-bg-color ">Create New List</button>
        <ul class="todo-list-list">
            ${todo_list_list.map((list, i)=>{
              return `<li class="todo-list-list__item primary-bg-color">
                <div onclick="TodoListList.selectList(${i})" class="todo-list-list__todo-list row">
                  <span class="todo-list-list__title">${list.title}</span>
                  <button onclick="TodoListList.removeList(${i})" class="todo-list-list__delete-btn">x</button>
                </div>
              </li>`
            }).join("")}
        </ul>
        `
      },
      createList() {
        let title = prompt('New list title is?')
        let action = {
          type: 'ADD_LIST',
          list: {
            title,
            items: []
          }
        }
        Observer.publish('action', action)
      },
      selectList(index){
        Observer.publish('action', {
          type: 'SELECT_LIST',
          index
        })
      },
      removeList(index){
        Observer.publish('action', {
          type: 'REMOVE_LIST',
          index
        })
      }
    }
})(window)
