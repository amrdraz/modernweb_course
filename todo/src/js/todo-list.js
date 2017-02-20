$injector.inject('TodoList', ['store',function(store){
  return  {
    state: {},
    render(list) {
      return `
      <div class="row create-todo">
        <input onchange="TodoList.updateNewItemValue(this.value)" type="text" class="create-todo__input" placeholder="Enter New To Do">
        <button onclick="TodoList.addItem()" type="button" class="create-todo__submit-btn secondary-bg-color ">+</button>
      </div>
      <ul class="todo-list col">
        ${list.items.map((item, i)=>(
          `<li class="todo-list__item">
            <div class="todo-item">
              <input onclick="TodoList.toggleDone(${i}, ${item.done})" class="todo-item__done" type="checkbox" ${item.done?'checked':''} >
              <span class="todo-item__text">${item.text}</span>
              <button onclick="TodoList.removeItem(${i})" class="todo-item__delete-btn">x</button>
            </div>
          </li>`
          )).join("")}
      </ul>`
    },
    toggleDone(index, done) {
      let action =  {
          type: 'TOGGLE_TODO_ITEM',
          index,
          done: !done
      }
      console.log(action);
      store.dispatch(action)
    },
    updateNewItemValue(val) {
      console.log(val)
      this.state.newItemValue = val;
    },
    addItem(){
      let action = {
          type: 'ADD_TODO_ITEM',
          item: {
            text: this.state.newItemValue,
            done: false
          }
      }
      console.log(action)
      store.dispatch(action)
      this.state.newItemValue = ""
    },
    removeItem(index){
      let action = {
          type: 'REMOVE_TODO_ITEM',
          index
      };
      console.log(action)
      store.dispatch(action)
    }
  }
}])
