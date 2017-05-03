$injector.define('TodoListList', function (Observer, prompt) {
  return {
      render(todo_list_list) {
        return {
          type: 'sidebar', props: { class: 'navigation col f-1' },
          children: [
            {
              type: 'button', props: { onclick: () => this.createList(), type:"button", class:"create-list secondary-bg-color" },
              children: ['Create New List']
            },
            {
              type: 'ul', props: { class:"todo-list-list" },
              children: todo_list_list.map((list, i)=>{
                  return {
                    type: 'li', props: { class:"todo-list-list__item primary-bg-color" },
                    children: [
                      {
                        type: 'div', props: { onclick: () => this.selectList(i), class:"todo-list-list__todo-list row" },
                        children: [
                          {
                            type: 'span', props: { class: "todo-list-list__title" },
                            children: [ list.title ]
                          },
                          {
                            type: 'button', props: { onclick: () => this.removeList(i), class:"todo-list-list__delete-btn" },
                            children: ['x']
                          }
                        ]
                      }
                    ]
                  }
                })
            }
          ]
        }
      },
      createList() {
        let title = prompt('New list title is?')
        let action = {
          type: 'ADD_LIST',
          list: {
            title,
            items: []
          }
        }
        Observer.publish('action', action)
      },
      selectList(index){
        Observer.publish('action', {
          type: 'SELECT_LIST',
          index
        })
      },
      removeList(index){
        Observer.publish('action', {
          type: 'REMOVE_LIST',
          index
        })
      }
    }
})
