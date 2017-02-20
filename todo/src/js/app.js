$injector.inject('App', [`TodoListList`, `TodoList`,function(TodoListList, TodoList){
  return {
    render(state) {
      return `
      <header class="header row primary-bg-color">
        <h1 class="header__title">To Do App</h1>
      </header>
      <div class="row">
        <sidbar class="navigation col f-1">
          ${TodoListList.render(state.todo_list_list)}
        </sidbar>
        <main class="col f-3">
          ${TodoList.render(state.todo_list_list[state.selected_list])}
        </main>
      </div>
      `
    }
  }
}])
