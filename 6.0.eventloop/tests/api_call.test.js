

/**
You need to create the following tests
GET	/posts
GET	/posts/1
GET	/posts/1/comments
POST	/posts
PUT	/posts/1
DELETE	/posts/1

GET posts and populate them with comments and their user
and return a users array with their posts and comments

expecting respnse that look liske { users: [{ ..., posts: [{ ... ,comments}]}] }

see https://mochajs.org/ for how mocha works
see
*/


// https://github.com/visionmedia/supertest
const supertest = require('supertest');
const { expect } = require('chai');

// see endpoint for api calls
const baseURL = 'https://jsonplaceholder.typicode.com'

const test = supertest(baseURL)



describe("Posts CRUD API calls", ()=>{

  it('should fail at getting pizza',  () => {
    // this will allways succeed even though it is false
     return test.get(`/pizza`).expect(404)
  })
  it('should fail at getting pizza',  (done) => {
    // this will allways succeed even though it is false
    test.get(`/pizza`).expect(404, done)
  })

  it('should send post fail at getting pizza',  () => {
    return test.post(`/posts`).send({
      "userId": 1,
      "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }).then(res=>{
      expect(res.status).to.equal(201)
      expect(res.body.id).to.exist
      expect(res.body.id).to.equal(101)
    })
  })
})
