(function functionName({$injector}) {
  $injector.inject("TodoListList", function () {
    return {
      initState: {
        "todo_list_list": [
        	{
      			"title": "First List",
      			"items": [
      				{
      					"text": "Somthing",
      					"done": false
      				},{
      					"text": "Something else",
      					"done": true
      				}
      			]
      		},
      		{
      			"title": "Second List",
      			"items": [
      				{
      					"text": "item 1",
      					"done": false
      				},{
      					"text": "item 2",
      					"done": false
      				}
      			]
      		}
        ]
      },
      render(state) {
        return `
        <ul class="todo-list-list">
            ${state.todo_list_list.map((list)=>{
              return `<li class="todo-list-list__item primary-bg-color">
                <a href="" class="todo-list-list_link row">
                  <span class="todo-list-list__title">${list.title}</span>
                  <button class="todo-list__delete-btn">x</button>
                </a>
              </li>`
            })}
        </ul>
        `
      }
    }
  })
})(window)
