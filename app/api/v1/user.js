const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')

const router = new Router({
  prefix: '/v1/user'
}) 

// 注册
router.post('/register', async ctx => {
  const v = await new RegisterValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password1'),
    nickname: v.get('body.nickname')
  }

  // 借助User model向数据表写入数据
  await User.create(user)

  // 借助异常捕获的方式返回成功的结果
  throw new global.errs.Success()
})

module.exports = router
