

(function functionName(global) {
  let {TodoListList, TodoList} = global
  global.App = {
      render(state) {
        return {
          type: 'app', props: {},
          children: [
            {
              type: 'header', props: { class: 'header row primary-bg-color' },
              children: [
                {
                  type: 'h1', props: { class: "header__title" },
                  children: [
                    'To Do App'
                  ]
                }
              ]
            },
            {
              type: 'div', props: { class: "row" },
              children: [
                ( TodoListList.render(state.todo_list_list) ),
                ( TodoList.render(state) )
              ]
            }
          ]
        }
      }
    }
})(window)
