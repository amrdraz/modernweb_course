
const _ = require('lodash');
// https://expressjs.com/en/guide/routing.html
const route = require('express').Router();

const TodoList = require('../models/todo-list');

route.get('/', (req, res, next) => {
  let query = _.pick(req.query, ['id', 'title']) // https://lodash.com/docs#pick
  TodoList.findAll(query)
  .then( lists => res.status(200).send(lists) )
  .catch(next)
})

route.get('/:id', (req, res, next) => {
  TodoList.find({ id: req.params.id })
  .then( list => res.status(200).send(list) )
  .catch(next)
})

route.post('/', (req, res, next) => {
  TodoList.create(req.body)
  .then( list => res.status(201).send(list) )
  .catch(next)
})

route.put('/:id', (req, res, next) => {
  TodoList.update({ id: req.params.id }, req.body)
  .then( list => res.status(200).send(list) )
  .catch(next)
})

route.delete('/:id', (req, res, next) => {
  TodoList.delete({ id: req.params.id })
  .then( _ => res.sendStatus(200) )
  .catch(next)
})


module.exports = route
