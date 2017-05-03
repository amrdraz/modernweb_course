

$injector.define('TodoList', function (Observer, TodoItem) {
  return {
        state: {},
        render(state) {
          let list = state.todo_list_list[state.selected_list]
          return {
            state: {},
            type: 'main', props: { class:"col f-3" },
            children: list?[
              {
                type: 'div', props: { class:"row create-todo" },
                children: [
                  { type: 'input', props: { onchange: (e) => this.setInputValue(e.target.value), type:"text", class:"create-todo__input", placeholder:"Enter New To Do", value: list.inputValue || "" }, children: [] },
                  {
                    type: 'button', props: { onclick: () => this.addItem(), type:"button", class:"create-todo__submit-btn secondary-bg-color" },
                    children: [ '+' ]
                  }
                ]
              },
              {
                type: 'ul', props: { class:"todo-list col" },
                children: list.items.map((item, i)=>(
                  {
                    type: 'li', props: { class:"todo-list__item" },
                    children: [
                      TodoItem.render({
                        text: item.text,
                        done: item.done,
                        toggleDone: () => this.toggleDone(i, item.done),
                        removeItem: () => this.removeItem(i)
                      })
                    ]
                  }
                ))

              }
            ]:[]
          }
        },
        setInputValue(value){
          this.state.inputValue = value
        },
        addItem(){
          Observer.publish('action', {
            type: 'ADD_ITEM',
            item: {
              text: this.state.inputValue,
              done: false
            }
          })
        },
        removeItem(index){
          Observer.publish('action', {
            type: 'REMOVE_ITEM',
            index
          })
        },
        toggleDone(index, done){
          Observer.publish('action', {
            type: 'TOGGLE_DONE_ITEM',
            index,
            done: !done
          })
        }
    }
})
