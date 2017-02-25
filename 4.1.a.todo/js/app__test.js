
(function tests(global){
      let {addTest, assert} = global.TestRunner
      let {App} = global

      addTest('Render App', function TodoItemTestResult() {
        let state = {todo_list_list:[], selected_list:0}
        return assert.HTMLEqual({
          actual: app.render(state),
          expect: (``)
        })
      })

      addTest('Select List Action Handeling', function TodoListListCreateTest(){
        let Observer = $injector.get('Observer')
        let old_state = {
          todo_list_list: [{title:'list'}, {title:'list2'}],
          selected_list: 0
        };
        let new_state;
        Observer.on('state.update', state=>{
          new_state = state
        })

        Observer.publish('action', {
          type: 'LOAD_STATE',
          state: old_state
        })
        Observer.publish('action', {
          type: 'SELECT_LIST',
          index: 1
        })

        return TestRunner.assert.deepEqual({
          actual: new_state,
          expect: {
            todo_list_list: [{title:'list'}, {title:'list2'}],
            selected_list: 1
          }
        })
      })

})(window)
