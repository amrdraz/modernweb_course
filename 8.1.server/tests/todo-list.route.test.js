const { expect } = require(`chai`);
const app = require(`../app`);
const request = require(`supertest`)(app);
const TodoList = require(`../models/todo-list`);

describe(`TodoList API`, () => {
  let recod_id;
  before(()=> {
    return TodoList.deleteAll({}).then(_=>TodoList.create({ title: `sad days` }))
  })

  it(`should POST /api/todo-list`, ()=>{
    return request.post(`/api/todo-list`).send({ title: `happy days` }).expect(201).then(res=>{
      let record = res.body
      expect(record).to.be.an(`object`)
      expect(record.title).to.exist
      expect(record.id).to.exist
      expect(record.title).to.equal(`happy days`)
      recod_id = record.id
    })
  })
  it(`should GET /api/todo-list/:id`, ()=>{
    return request.get(`/api/todo-list/${recod_id}`).expect(200).then(res=>{
      let record = res.body
      expect(record).to.not.be.an(`array`)
      expect(record.title).to.exist
      expect(record.id).to.exist
      expect(record.id).to.equal(recod_id)
      expect(record.title).to.equal(`happy days`)
    })
  })
  it(`should GET /api/todo-list`, ()=>{
    return request.get(`/api/todo-list`).expect(200).then(res=>{
      let record = res.body
      expect(record).to.be.an(`array`)
      expect(record).to.have.length(2)
    })
  })
  it(`should GET /api/todo-list?title= `, ()=>{
    return request.get(`/api/todo-list`).query({
      title: `happy days`
    }).expect(200).then(res=>{
      let record = res.body
      expect(record).to.be.an(`array`)
      expect(record).to.have.length(1)
    })
  })
  it(`should PUT /api/todo-list/:id`, ()=>{
    return request.put(`/api/todo-list/${recod_id}`).send({ title: `sad days`}).expect(200).then(res=>{
      let record = res.body
      expect(record).to.be.an(`object`)
      expect(record.title).to.equal(`sad days`)
    })
  })
  it(`should DELETE /api/todo-list/:id`, ()=>{
    return request.delete(`/api/todo-list/${recod_id}`).expect(200).then(_=>{
      return TodoList.find({id: recod_id})
    }).then(list=>{
      expect(list).to.not.exist
    })
  })
})
