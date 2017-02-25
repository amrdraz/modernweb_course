

$injector.inject('TodoList', function (store, TodoItem) {

  return {
      state: {},
      render(list) {
        return (<main class="col f-3">
          <div class="row create-todo">
            <input onchange={(e)=>TodoList.setInputValue(e.target.value)} type="text" class="create-todo__input" placeholder="Enter New To Do"/>
            <button onclick={()=> this.addItem()} type="button" class="create-todo__submit-btn secondary-bg-color ">+</button>
          </div>
          <ul class="todo-list col">
            {list.items.map((item, i)=>(
              <li class="todo-list__item">
                {TodoItem.render({
                  text: item.text,
                  done: item.done,
                  toggleDone: () => this.toggleDone(i, item.done),
                  removeItem: () => this.removeItem(i)
                })}
              </li>
              ))}
          </ul>
        </main>)
      },
      setInputValue(value){
        this.state.inputValue = value
      },
      addItem(){
        store.dispatch({
          type: 'ADD_ITEM',
          item: {
            text: this.state.inputValue,
            done: false
          }
        })
        this.state.inputValue=""
      },
      removeItem(index){
        store.dispatch({
          type: 'REMOVE_ITEM',
          index
        })
      },
      toggleDone(index, done){
        store.dispatch({
          type: 'TOGGLE_DONE_ITEM',
          index,
          done: !done
        })
      }
  }
})
