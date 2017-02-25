

$injector.inject('App', function (TodoListList, TodoList) {
  return {
    render(state) {
      return (
        <app>
          <header class="header row primary-bg-color">
            <h1 class="header__title">To Do App</h1>
          </header>
          <div class="row">
              {TodoListList.render(state.todo_list_list)}
              {state.todo_list_list[state.selected_list]?
                TodoList.render(state.todo_list_list[state.selected_list])
              :null}
          </div>
        </app>
      )
    }
  }
})
