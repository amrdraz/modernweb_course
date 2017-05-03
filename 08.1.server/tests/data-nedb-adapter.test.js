const path = require('path');
const { expect } = require('chai');
const NeDBAdapter = require('../lib/data-nedb-adapter');

describe('NeDB Adapter', () => {
  let adapter, recod_id;
  before(()=> {
    adapter = new NeDBAdapter()
  })
  before(()=> {
    return adapter.deleteAll('testCollection', {})
  })

  it('should be capable of getting a db object', ()=>{
    let collection = adapter._collection('testCollection')
    expect(collection).to.exist
    expect(collection.filename).to.equal(path.join(__dirname,'..','data','testCollection.db'))
  })
  it('should create a record', ()=>{
    return adapter.create('testCollection', { text: 'happy days', done: true }).then(record=>{
      expect(record).to.be.an('object')
      expect(record.text).to.exist
      expect(record.id).to.exist
      expect(record.text).to.equal('happy days')
      recod_id = record.id
    })
  })
  it('should create many records', ()=>{
    return adapter.createAll('testCollection', [{ text: 'happy weekend days', done: false }, { text: 'happy week days', done: false }]).then(record=>{
      expect(record).to.be.an('array')
      expect(record).to.have.length(2)
      expect(record[0].text).to.exist
      expect(record[0].id).to.exist
      expect(record[0].text).to.equal('happy weekend days')
    })
  })
  it('should find one record', ()=>{
    return adapter.find('testCollection', { id: recod_id }).then(record=>{
      expect(record).to.not.be.an('array')
      expect(record.text).to.exist
      expect(record.id).to.exist
      expect(record.id).to.equal(recod_id)
      expect(record.text).to.equal('happy days')
    })
  })
  it('should find all record', ()=>{
    return adapter.findAll('testCollection', {}).then(record=>{
      expect(record).to.be.an('array')
      expect(record).to.have.length(3)
    })
  })
  it('should find many record', ()=>{
    return adapter.findAll('testCollection', { done: false }).then(record=>{
      expect(record).to.be.an('array')
      expect(record).to.have.length(2)
    })
  })
  it('should update a record', ()=>{
    return adapter.update('testCollection', { id: recod_id }, { done: false}).then(record=>{
      expect(record).to.be.an('object')
      expect(record.done).to.equal(false)
    })
  })
  it('should update many records', ()=>{
    return adapter.updateAll('testCollection', { done: false }, { done: true }).then(record=>{
      expect(record).to.be.an('array')
      expect(record).to.have.length(3)
    })
  })
  it('should delete one record', ()=>{
    return adapter.delete('testCollection', { id: recod_id }).then(affected=>{
      expect(affected).to.equal(1)
    })
  })
  it('should delete many records', ()=>{
    return adapter.deleteAll('testCollection', { done: true }).then(affected=>{
      expect(affected).to.equal(2)
    })
  })
})
