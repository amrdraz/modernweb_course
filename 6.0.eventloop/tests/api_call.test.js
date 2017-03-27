

/**
You need to create the following tests
GET	/posts
GET	/posts/1
GET	/posts/1/comments
POST	/posts
PUT	/posts/1
DELETE	/posts/1

GET posts and populate them with comments and the post user
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

const request = supertest(baseURL)



describe("Posts CRUD API calls", ()=>{

  it('should fail at getting pizza',  () => {
    // this will allways succeed even though it is false
     return request.get(`/pizza`).expect(404)
  })
  it('should fail at getting pizza',  (done) => {
    // this will allways succeed even though it is false
    request.get(`/pizza`).expect(404, done)
  })

  it('should send post a post',  () => {
    return request.post(`/posts`).send({
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



describe("doing some promise examples", ()=>{
  it('should return a list of posts with their comments', function (markTestAsDone) {
    this.timeout(10000)
    request.get(`/posts`).then(res=>{
      let posts = res.body
      // console.log(posts[0]);
      // let post = posts[0];
      console.log(`starting to get post comments for ${posts.length} posts`);

      let posts_comments_promise = getPostsWithComments(posts)

      posts_comments_promise.then(posts=>{
          console.log(`I am done`);
          markTestAsDone()
      }).catch(err=>console.log(err))

    })
  })
})

function getPostsWithComments(posts) {
  return Promise.all(posts.map(post=> {
    console.log(`getting comments of post ${post.id}`);
    return request.get(`/posts/${post.id}/comments`).then(res=> {
      let comments = res.body
      return Object.assign({}, post, { comments: comments})
    })
  }))
}
