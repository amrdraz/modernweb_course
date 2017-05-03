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
      case 'SELECT_LIST':
        state.selected_list = action.index
      break;
      case 'REMOVE_LIST':
        state.todo_list_list.splice(action.index, 1)
        if(state.todo_list_list.length<=state.selected_list) {
          state.selected_list = state.todo_list_list.length - 1
        }
      break;
      case 'ADD_ITEM':
        state.todo_list_list[state.selected_list].items.push(action.item)
      break;
      case 'REMOVE_ITEM':
        state.todo_list_list[state.selected_list].items.splice(action.index, 1)
      break;
      case 'TOGGLE_DONE_ITEM':
        items = state.todo_list_list[state.selected_list].items
        items[action.index].done = action.done
      break;
    }
    Observer.publish('state.update', state)
  })

  Observer.on('state.update', function(state){
    renderStateToHTML(appContainer, state);
  })

})(window)
