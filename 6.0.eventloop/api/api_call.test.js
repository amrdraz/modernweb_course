

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

Do with promises Promise.all


see https://mochajs.org/ for how mocha works
see
*/


// https://github.com/visionmedia/supertest
const supertest = require('supertest');
const { expect } = require('chai');

// https://github.com/mzabriskie/axios
const axios = require('axios');

// see endpoint for api calls
const baseURL = 'https://jsonplaceholder.typicode.com'

const request = axios.create({ baseURL })

describe()

it('should fail at getting pizza',  (done) => {
  // this will allways succeed even though it is false
   supertest(baseURL).get(`/posts`).then(res=>{
     console.log(res.status);
      let posts = res.body
      getAllComment(posts).then(posts_with_comments)=> {
        console.log(posts_with_comments);
        done()
      })

   })
});

 function * getAllComment (posts, callback) {
  let comments = yield Promise.all(posts.map(post=>{
    return  supertest(baseURL).get(`/posts/${post.id}/comments`)
  })

  return comments.map((comment, i)=>{
    Object.assign({}, posts[i], {comments: comments})
  })
}
