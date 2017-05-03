

$injector.inject('App', function (TodoListList, TodoList) {

  let Header = (props) => (<header class="header row primary-bg-color">
      <h1 class="header__title">{props.children}</h1>
    </header>)

  return {
    render(state) {
      return (
        <app>
          <Header>To Do App</Header>
          <div class="row">
              <TodoListList todo_list_list={state.todo_list_list} selected_list={state.selected_list} ></TodoListList>
              {state.todo_list_list[state.selected_list] &&
                <TodoList list={state.todo_list_list[state.selected_list]}></TodoList>
              }
          </div>
        </app>
      )
    }
  }
})
