$injector.run(function (App, store, reducers, document, global) {

  let appContainer = document.querySelector('#appContainer')

  let render = function(container, state) {
    container.innerHTML = App.render(state)
  }

  store.subscribe(state => render(appContainer, state))

  store.setReducer(reducers.app)

  store.dispatch({
    type: 'LOAD_STATE',
    state: {
      "todo_list_list": [
        {
          "title": "First List",
          "items": [
            {
              "text": "Somthing Js",
              "done": false
            },{
              "text": "Something else",
              "done": true
            }
          ]
        },
        {
          "title": "Second List",
          "items": [
            {
              "text": "item 1",
              "done": false
            },{
              "text": "item 2",
              "done": false
            }
          ]
        }
      ],
      "selected_list": 0
    }
  })

  global.TodoList = $injector.get('TodoList')
  global.TodoListList = $injector.get('TodoListList')
})
