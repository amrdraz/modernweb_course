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
    let items, item;
    switch(action.type) {
      case 'ADD_LIST':
      state.todo_list_list = actions.ADD_LIST(state.todo_list_list, action)
      break;
      case 'SELECT_LIST':
      state = actions.SELECT_LIST(state, action)
      break;
      case 'REMOVE_LIST':
      state.todo_list_list = actions.REMOVE_LIST(state.todo_list_list, action)
      state.selected_list = -1
      break;
      case 'ADD_ITEM':
      items = state.todo_list_list[state.selected_list].items
      state.todo_list_list[state.selected_list].items = actions.ADD_ITEM(items, action)
      break;
      case 'REMOVE_ITEM':
      items = state.todo_list_list[state.selected_list].items
      state.todo_list_list[state.selected_list].items = actions.REMOVE_ITEM(items, action)
      break;
      case 'TOGGLE_DONE_ITEM':
      items = state.todo_list_list[state.selected_list].items
      item = items[action.index]
      items[action.index] = actions.TOGGLE_DONE_ITEM(item, action)
      break;
      default: state = state
    }
    Observer.publish('state.update', state)
  })


  let actions = {
    ADD_LIST(todo_list_list, action){
      // equivilant to todo_list_list.push(action.list) but creates a new list
      return [...todo_list_list, action.list]
    },
    REMOVE_LIST(todo_list_list, action){
      // shallow copy of array
      let list = [...todo_list_list]
      // the return value is not the array but the removed items
      list.splice(action.index, 1)
      return list
    },
    SELECT_LIST(state, action){
      // create a new state {}, then shallow copy the old state in it, then overide selected_list
      return Object.assign({}, state, {selected_list: action.index})
    },
    ADD_ITEM(items, action){
      // equivilant to list.push(action.item) but creates a new items list
      return [...items, action.item]
    },
    REMOVE_ITEM(items, action){
      items = [...items] // copy
      items.splice(action.index, 1) // remove
      return items
    },
    TOGGLE_DONE_ITEM(item, action){
      // create a new item {}, then copy the old item in it, then overide done
      return Object.assign({}, item, {done: action.done})
    }
  }

  Observer.on('state.update', function(state){
    renderStateToHTML(appContainer, state);
  })

})(window)
