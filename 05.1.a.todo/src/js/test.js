(function main(global) {
  (function tests(global){
      let {TodoItem} = global

      let TodoItemTestResult = (function TodoItemTestResult(){
        let props = {
          text: "Hello",
          done: true,
          index: 0
        }
        let expectedOutput = (`<div class="todo-item">
        <input onclick="TodoList.toggleDone(0, true)"  class="todo-item__done" type="checkbox" checked >
        <span class="todo-item__text">Hello</span>
        <button onclick="TodoList.removeItem(0)" class="todo-item__delete-btn">x</button>
      </div>`).replace(/[\s]+/g," ")
        let actualOutput = TodoItem.render(props).replace(/[\s]+/g," ")
        return {
          testValue: actualOutput===expectedOutput,
          actual: actualOutput,
          expected: expectedOutput
        }
      })()


      let TestResults = {
        TodoItemTestResult
      }

      console.log(TestResults)

      let failedTest = ""
      if(ValidateTests()) {
        console.log("All Tests Passed");
      } else {
        console.log("Test Failed");
        console.log("Expected");
        console.log(failedTest.expected);
        console.log("Got");
        console.log(failedTest.actual);
      }

      function ValidateTests(){
        return Object.keys(TestResults).every(function (test) {
          failedTest = TestResults[test]
          return TestResults[test].testValue
        })
      }
  })(window)

})(window)
