const Router = require('koa-router')
const router = new Router()

router.get('/v1/classic/:id/latest', (ctx, next) => {
  const path = ctx.params
  const query = ctx.request.query
  const headers = ctx.request.header
  const body = ctx.request.body
  if(true) {
    const err = new global.errs.ParameterException()
    throw err
  }
  ctx.body = {
    key: 'classic'
  }
})

module.exports = router