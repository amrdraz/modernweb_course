
module.exports = (app)=> {
  app.use(`/api/todo-list`, require('./todo-list'))
  app.use(`/api/todo-item`, require('./todo-item'))
}
