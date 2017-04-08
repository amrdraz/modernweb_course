const path = require('path');
const { expect } = require('chai');
const TodoList = require('../models/todo-list');

describe('TodoList Model', () => {
  let recod_id;
  before(()=> {
    return TodoList.deleteAll({})
  })

  it('should create a record', ()=>{
    return TodoList.create({ title: 'happy days' }).then(record=>{
      expect(record).to.be.an('object')
      expect(record.title).to.exist
      expect(record.id).to.exist
      expect(record.title).to.equal('happy days')
      recod_id = record.id
    })
  })
  it('should create many records', ()=>{
    return TodoList.createAll([{ title: 'happy weekend days' }, { title: 'happy week days' }]).then(record=>{
      expect(record).to.be.an('array')
      expect(record).to.have.length(2)
      expect(record[0].title).to.exist
      expect(record[0].id).to.exist
      expect(record[0].title).to.equal('happy weekend days')
    })
  })
  it('should find one record', ()=>{
    return TodoList.find({ id: recod_id }).then(record=>{
      expect(record).to.not.be.an('array')
      expect(record.title).to.exist
      expect(record.id).to.exist
      expect(record.id).to.equal(recod_id)
      expect(record.title).to.equal('happy days')
    })
  })
  it('should find not find a record', ()=>{
    return TodoList.find({ id: 'c00000OrSerrlzC6' }).then(record=>{
      expect(record).to.equal(null)
    })
  })
  it('should find all record', ()=>{
    return TodoList.findAll({}).then(record=>{
      expect(record).to.be.an('array')
      expect(record).to.have.length(3)
    })
  })
  it('should update a record', ()=>{
    return TodoList.update({ id: recod_id }, { title: 'sad days'}).then(record=>{
      expect(record).to.be.an('object')
      expect(record.title).to.equal('sad days')
    })
  })
  it('should delete one record', ()=>{
    return TodoList.delete({ id: recod_id }).then(affected=>{
      expect(affected).to.equal(1)
    })
  })
})
