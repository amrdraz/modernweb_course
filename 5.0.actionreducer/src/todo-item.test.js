let React = require('react')
let {renderString} = require('vdom')
let {TodoItemJSX, TodoItemString} = require('./todo-item')

test('render TodoItemString', () => {

  expect(<TodoItemString text={'Hello'} done={true} ></TodoItemString>).toMatchSnapshot();
})


test('render TodoItemJSX to vdom', () => {
  let props = {
      text:'Hello',
      done: true
  }
  expect(<TodoItemJSX {...props} ></TodoItemJSX>).toMatchSnapshot();
})

test('render TodoItemJSX to Stirng', () => {
  let props = {
      text:'Hello',
      done: true
  }
  expect(renderString(<TodoItemJSX {...props} ></TodoItemJSX>)).toMatchSnapshot();
})
