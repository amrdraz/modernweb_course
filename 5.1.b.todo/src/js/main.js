$injector.run(function (App, store, reducers, document, global, renderer) {

  let appContainer = document.querySelector('#appContainer')

  store.subscribe(state => renderer.renderHTML(appContainer, App.render(state)))

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
