
(function (global){
      let {addTest, assert} = global.TestRunner
      let {TodoItem} = global
      addTest('TodoItemTest', function TodoItemTestResult() {
        let props = {
          text: "Hello",
          done: true,
          index: 0
        }
        return assert.HTMLEqual({
          actual: TodoItem.render(props),
          expect: (`<div class="todo-item">
            <input onclick="TodoList.toggleDone(0, true)"  class="todo-item__done" type="checkbox" checked >
            <span class="todo-item__text">Hello</span>
            <button onclick="TodoList.removeItem(0)" class="todo-item__delete-btn">x</button>
          </div>`)
        })
      })

})(window)