(function main({App, document, Observer}) {
  let appContainer = document.querySelector('#appContainer')
  let state = {
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

  renderStateToHTML(appContainer, state)

  function renderStateToHTML(container, state) {
    container.innerHTML = App.render(state)
  }

  Observer.subscribe('action', function HandleActions(action){
    switch(action.type) {
      case 'ADD_LIST':
        if(state.todo_list_list.length<0) {
          state.selected_list = 0
        }
        state.todo_list_list.push(action.list)
      break;
    }
    Observer.publish('state.update', state)
  })

  Observer.on('state.update', function(state){
    renderStateToHTML(appContainer, state);
  })

})(window)
