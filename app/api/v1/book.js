const Router = require('koa-router')
const router = new Router() 

router.get('/v1/book/latest', (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': 'http://localhost:9527',
    'Access-Control-Allow-Credentials': true,
  })
  ctx.body = {'key': 'book'}
})

module.exports = router