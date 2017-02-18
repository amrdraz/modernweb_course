(function main({App, document, Observer}, two, three) {
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
  function renderStateToHTML(state) {
    document.querySelector('#appContainer').innerHTML = App.render(state)
  }
  renderStateToHTML(state)

  Observer.subscribe('action', function HandleAction(action){
    switch(action.type) {
      case 'ADD_TODO_LIST':
      state.todo_list_list.push(action.list)
      break;
    }
    Observer.publish('state.update', state)
  })

  Observer.on('state.update', function(state){
    renderStateToHTML(state);
  })

})(window,2,3)
