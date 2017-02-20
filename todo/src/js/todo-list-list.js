$injector.inject('TodoListList', ['store',function(store){
  return {
      render(todo_list_list) {
        return `
        <button type="button" onclick="TodoListList.createList()" class="create-list secondary-bg-color ">Create New List</button>
        <ul class="todo-list-list">
            ${todo_list_list.map((list, i)=>{
              return `<li onclick="TodoListList.selectList(${i})" class="todo-list-list__item primary-bg-color">
                <a href="" class="todo-list-list__todo-list row">
                  <span class="todo-list-list__title">${list.title}</span>
                  <button onclick="TodoListList.removeList(${i});event.preventDefault();" class="todo-list-list__delete-btn">x</button>
                </a>
              </li>`
            }).join("")}
        </ul>
        `
      },
      createList() {
        let listName = prompt("What would you like to call the list?")
        let action = {
          type: 'ADD_TODO_LIST',
          list: {"title": listName,
            "items": []
          }
        }
        console.log(action);
        store.dispatch(action)
      },
      removeList(index) {
        let action = {
          action: 'REMOVE_TODO_LIST',
          index
        }
        store.dispatch(action)
      },
      selectList(index){
        let action = {
          type: 'SELECT_TODO_LIST',
          index
        }
        store.dispatch(action)
      }
    }
}])
