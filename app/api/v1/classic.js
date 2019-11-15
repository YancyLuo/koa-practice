const Router = require('koa-router')
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const router = new Router({
  prefix: '/v1/classic'
})


router.get('/latest', new Auth(7).m, async (ctx, next) => {
  // const path = ctx.params
  // const query = ctx.request.query
  // const headers = ctx.request.header
  // const body = ctx.request.body
  
  // const v = await new PositiveIntegerValidator().validate(ctx)
  ctx.body = ctx.auth
})

module.exports = router