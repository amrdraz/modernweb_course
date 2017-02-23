

(function (global) {
  let Observer = $injector.get('Observer')

  global.TodoList = {
        state: {},
        render(list) {
          return `
          <div class="row create-todo">
            <input onchange="TodoList.setInputValue(this.value)" type="text" class="create-todo__input" placeholder="Enter New To Do">
            <button onclick="TodoList.addItem()" type="button" class="create-todo__submit-btn secondary-bg-color ">+</button>
          </div>
          <ul class="todo-list col">
            ${list.items.map((item, i)=>(
              `<li class="todo-list__item">
                ${TodoItem.render({
                  text: item.text,
                  done: item.done,
                  index: i
                })}
              </li>`
              )).join("")}
          </ul>`
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
          this.state.inputValue=""
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
})(window)
