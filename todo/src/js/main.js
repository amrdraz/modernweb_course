(function main(global) {
  let {document, $injector} = global
  $injector.initAll()
  let App = $injector.get('App')
  let TestApp = $injector.init('App', {
    TodoList: { render(){return "" }},
    TodoListList: { render(){return "" }},
  })
  let renderStateToHTML = $injector.get('renderer')
  let store = $injector.get('store')

  store.subscribe(state=>{
    document.querySelector('#appContainer').innerHTML = App.render(state)
  })

  document.querySelector('#appContainer').innerHTML = App.render(store.getState())
  // renderStateToHTML(store.getState())

  global.TodoListList = $injector.get('TodoListList')
  global.TodoList = $injector.get('TodoList')
})(window)
