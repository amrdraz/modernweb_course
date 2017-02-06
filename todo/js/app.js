(function functionName({Injector, window}) {
  $injector.initAll();
  let TodoListList = $injector.get('TodoListList')
  $element = document.querySelector('.todo-list-list')
  TodoListList.init()
  $element.outerHTML = TodoListList.render(TodoListList.initState)
})(window)
