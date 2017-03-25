
// https://github.com/visionmedia/supertest
const supertest = require('supertest');

// https://github.com/mzabriskie/axios
const axios = require('axios');

const baseURL = 'https://jsonplaceholder.typicode.com'

const request = axios.create({ baseURL })


test('should fail at getting pizza',  () => {
  // this will allways succeed even though it is false
  supertest(baseURL).get(`/pizza`).expect(404)
});

test('should fail at getting pizza',  (done) => {
   supertest(baseURL).get(`/pizza`).expect(404, done)
});

test('should get posts',  (done) => {
   expect.reject(request.get(`/posts`).then(res=> {
     console.log(res.status);
     console.log(res.data[0]);
     expect.toBe(res.status, 404)
     expect.toBe(res.data.length, 100)
  })
});

// Test all of the API
