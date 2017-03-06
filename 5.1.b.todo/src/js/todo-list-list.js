$injector.inject('TodoListList', function (store, prompt) {
  return {
      render({todo_list_list, selected_list}) {
        return (<sidebar class="navigation col f-1">
          <button onclick={()=>this.createList()} type="button" class="create-list secondary-bg-color ">Create New List</button>
          <ul class="todo-list-list">
              {todo_list_list.map((list, i)=>{
                return (<li class="todo-list-list__item primary-bg-color">
                  <div onclick={()=>this.selectList(i)} class="todo-list-list__todo-list row">
                    <span class="todo-list-list__title">{list.title}</span>
                    <button onclick={(e)=>{e.stopPropagation();this.removeList(i)}} class="todo-list-list__delete-btn">x</button>
                  </div>
                </li>)
              })}
          </ul>
        </sidebar>)
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
        store.dispatch(action)
      },
      selectList(index){
        store.dispatch({
          type: 'SELECT_LIST',
          index
        })
      },
      removeList(index){
        store.dispatch({
          type: 'REMOVE_LIST',
          index
        })
      }
    }
})
