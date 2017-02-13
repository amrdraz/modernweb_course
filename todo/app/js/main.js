(function functionName({document, App, Observer}) {
  let state = {
    "todo_list_list": [
      {
        "title": "First List",
        "items": [
          {
            "text": "Somthing",
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
  function renderStateToHTML(state) {
    document.querySelector('#appContainer').innerHTML = App.render(state)
  }
  renderStateToHTML(state)



  Observer.on('action', (action)=>{
    actions =  {
      'ADD_TODO_LIST': ({list})=> {
        state.todo_list_list.push(list)
      },
      'REMOVE_TODO_LIST': ({index})=> {
        state.todo_list_list = state.todo_list_list.splice(index, 1)
      },
      'SELECT_TODO_LIST': ({index})=> {
        state.selected_list = index;
      },
      'ADD_TODO_ITEM': ({item})=> {
        state.todo_list_list[state.selected_list].items.push(item)
      },
      'REMOVE_TODO_ITEM': ({index})=> {
        state.todo_list_list[state.selected_list].items.splice(index, 1)
      },
      'TOGGLE_TODO_ITEM': ({index, done})=> {
        state.todo_list_list[state.selected_list].items[index].done = done;
      },

    }
    actions[action.type](action)
    renderStateToHTML(state)
  })


})(window)
