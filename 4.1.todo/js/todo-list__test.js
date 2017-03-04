
(function tests(global){
      let {addTest, assert} = global.TestRunner
      let {TodoList} = global

      addTest('Render TodoList with empty items', function TodoItemTestResult() {
        let list = {items:[]}
        return assert.HTMLEqual({
          actual: TodoList.render(list),
          expect: (`
            <div class="row create-todo">
            <input onchange="TodoList.setInputValue(this.value)" type="text" class="create-todo__input" placeholder="Enter New To Do">
            <button onclick="TodoList.addItem()" type="button" class="create-todo__submit-btn secondary-bg-color ">+</button>
          </div>
          <ul class="todo-list col">

          </ul>`)
        })
      })

})(window)
