(function main(global) {
  let {App, document} = global
  let Observer = $injector.get('Observer')
  let appContainer = document.querySelector('#appContainer')

  function renderStateToHTML(container, state) {
    container.innerHTML = App.render(state)
  }

  Observer.on('state.update', function(new_state){
    renderStateToHTML(appContainer, new_state);
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

})(window)
