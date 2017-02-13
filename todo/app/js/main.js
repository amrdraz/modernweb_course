(function functionName({document, App, Observer}) {
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

})(window)
