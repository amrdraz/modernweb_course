$injector.run(function(App, document, Observer, renderer){
  let appContainer = document.querySelector('#appContainer')

  Observer.on('state.update', function(new_state){
    renderer.renderHTML(appContainer, App.render(new_state));
  })

  Observer.publish('action', {
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
})
