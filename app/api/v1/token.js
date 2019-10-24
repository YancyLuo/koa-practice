const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const {loginType} = require('../../lib/enmu')

const router = new Router({
  prefix: '/v1/token'
}) 

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  const type = v.get('body.type')

  switch (type) {
    case loginType.USER_EMAIL:
      await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    
    case loginType.USER_MINI_PROGRAM:
      break;
    default: 
      throw new global.errs.ParameterException('没有相应处理函数')
  }
})

async function emailLogin(account, secret) {
 const user = await User.verifyEamilPassword(account, secret)
}

module.exports = router