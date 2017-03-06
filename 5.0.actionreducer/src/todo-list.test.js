let React = require('react')
let {renderString} = require('vdom')
let {TodoList} = require('./todo-list')

test('render TodoList with empty array', () => {
  let list = {
      items: []
  }
  expect(renderString(<TodoList list={list} ></TodoList>)).toMatchSnapshot();
})


test('render TodoList with empty item', () => {
  let list = {
      items: [{
        text: "Hello",
        done: false
      }]
  }
  expect(renderString(<TodoList list={list} ></TodoList>)).toMatchSnapshot();
})
