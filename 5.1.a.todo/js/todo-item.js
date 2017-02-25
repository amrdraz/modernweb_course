(function functionName(global) {
  global.TodoItem = {
      // localState: {},
      render(item) {
        return {
          type: 'div', props: { class:"todo-item" },
          children: [
            { type: 'input', props: { onclick: item.toggleDone, class:"todo-item__done", type:"checkbox", checked:item.done?true:false }, children: []},
            {
              type: 'span', props: { class:"todo-item__text" },
              children: [ item.text ]
            },
            {
              type: 'button', props: { onclick: item.removeItem, class:"todo-item__delete-btn" },
              children: [ 'x' ]
            }
          ]
        }
      }
    }
})(window)
