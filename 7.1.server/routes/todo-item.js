
const _ = require('lodash');
// https://expressjs.com/en/guide/routing.html
const route = require('express').Router();

const TodoItem = require('../models/todo-item');

route.get('/', (req, res, next) => {
  let query = _.pick(req.query, ['id', 'list_id', 'done', 'text']) // https://lodash.com/docs#pick
  TodoItem.findAll(query)
  .then( items => res.status(200).send(items) )
  .catch(next)
})

route.get('/:id', (req, res, next) => {
  TodoItem.find({ id: req.params.id })
  .then( item => res.status(200).send(item) )
  .catch(next)
})

route.post('/', (req, res, next) => {
  TodoItem.create(req.body)
  .then( item => res.status(201).send(item) )
  .catch(next)
})

route.put('/:id', (req, res, next) => {
  TodoItem.update({ id: req.params.id }, req.body)
  .then( item => res.status(200).send(item) )
  .catch(next)
})

route.delete('/:id', (req, res, next) => {
  TodoItem.delete({ id: req.params.id })
  .then( _ => res.sendStatus(200) )
  .catch(next)
})


module.exports = route
