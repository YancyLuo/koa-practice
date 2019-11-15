const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const {loginType} = require('../../lib/enmu')
const {generateToken} = require('../../../core/util.js')
const {Auth} = require('../../../middlewares/auth')
const {WXManage} = require('../../services/wx')

const router = new Router({
  prefix: '/v1/token'
}) 

router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  const type = v.get('body.type')

  let token
  switch (type) {
    case loginType.USER_EMAIL:
      token = await emailLogin(v.get('body.account'), v.get('body.secret'))
      break;
    
    case loginType.USER_MINI_PROGRAM:
      token = WXManage.codeToToken(v.get('body.account'))
      break;
    default: 
      throw new global.errs.ParameterException('没有相应处理函数')
  }
  ctx.body = {
    token
  }
})

async function emailLogin(account, secret) {
 const user = await User.verifyEamilPassword(account, secret)
 return token = generateToken(user.id, Auth.USER)
}

module.exports = router