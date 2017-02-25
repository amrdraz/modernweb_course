
(function tests(global){
      let {addTest, assert} = global.TestRunner
      let {TodoListList } = global
      let default_sate = {
        todo_list_list: [],
        selected_list: -1
      };

      addTest('Render TodoListList with empty list', function TodoListListRenderTest() {
        let list = []
        return assert.HTMLEqual({
          actual: TodoListList.render(list),
          expect: (` do this `)
        })
      })

      addTest('Create List Action creation', function TodoListListCreateTest(){
        let originalPrompt =  global.prompt
        let originalObserver =  global.Observer

        let capturedAction = null
        let mockPrompt = () => 'Mock Title'
        let mockObserver = {
          publish(event, action) { capturedAction = action }
        }

        global.prompt = mockPrompt
        // You will not be able to mock this without dependecy injection
        global.Observer = mockObserver
        TodoListList.createList()
        global.prompt = originalPrompt
        global.Observer = originalObserver

        return TestRunner.assert.deepEqual({
          actual: capturedAction,
          expect: {
            type: 'ADD_LIST',
            list: {
              title: 'Mock Title',
              items: []
            }
          }
        })
      })

      addTest('Remove List Action Handeling', function TodoListListCreateTest(){
        let Observer = $injector.get('Observer')
        let old_state = {
          todo_list_list: [{title:'list'}],
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
          type: 'REMOVE_LIST',
        })

        return TestRunner.assert.deepEqual({
          actual: new_state,
          expect: {
            todo_list_list: [],
            selected_list: -1
          }
        })
      })

})(window)
