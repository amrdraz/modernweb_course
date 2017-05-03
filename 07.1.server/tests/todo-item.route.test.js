const { expect } = require(`chai`);
const app = require(`../app`);
const request = require(`supertest`)(app);
const TodoItem = require(`../models/todo-item`);

describe(`TodoItem API`, () => {
  let recod_id;
  before(()=> {
    return TodoItem.deleteAll({}).then(_=>TodoItem.create({ text: `sad days` }))
  })

  it(`should POST /api/todo-item`, ()=>{
    return request.post(`/api/todo-item`).send({ text: `happy days` }).expect(201).then(res=>{
      let record = res.body
      expect(record).to.be.an(`object`)
      expect(record.text).to.exist
      expect(record.id).to.exist
      expect(record.text).to.equal(`happy days`)
      recod_id = record.id
    })
  })
  it(`should GET /api/todo-item/:id`, ()=>{
    return request.get(`/api/todo-item/${recod_id}`).expect(200).then(res=>{
      let record = res.body
      expect(record).to.not.be.an(`array`)
      expect(record.text).to.exist
      expect(record.id).to.exist
      expect(record.id).to.equal(recod_id)
      expect(record.text).to.equal(`happy days`)
    })
  })
  it(`should GET /api/todo-item`, ()=>{
    return request.get(`/api/todo-item`).expect(200).then(res=>{
      let record = res.body
      expect(record).to.be.an(`array`)
      expect(record).to.have.length(2)
    })
  })
  it(`should GET /api/todo-item?text= `, ()=>{
    return request.get(`/api/todo-item`).query({
      text: `happy days`
    }).expect(200).then(res=>{
      let record = res.body
      expect(record).to.be.an(`array`)
      expect(record).to.have.length(1)
    })
  })
  it(`should PUT /api/todo-item/:id`, ()=>{
    return request.put(`/api/todo-item/${recod_id}`).send({ text: `sad days`}).expect(200).then(res=>{
      let record = res.body
      expect(record).to.be.an(`object`)
      expect(record.text).to.equal(`sad days`)
    })
  })
  it(`should DELETE /api/todo-item/:id`, ()=>{
    return request.delete(`/api/todo-item/${recod_id}`).expect(200).then(_=>{
      return TodoItem.find({id: recod_id})
    }).then(list=>{
      expect(list).to.not.exist
    })
  })
})
