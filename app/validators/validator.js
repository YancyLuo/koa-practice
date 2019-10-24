const {Rule, LinValidator} = require('../../core/lin-validator-v2')
const {User} = require('../models/user')
const {loginType} = require('../lib/enmu')

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要正整数', {min: 1})
    ]
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super() 
    this.email = [
      new Rule('isEmail', '不符合邮箱规范')
    ]
    this.password1 = [
      new Rule('isLength', '密码长度在6-32个字符', {min: 6, max: 32}),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]  
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称在4-32个字符', {min: 4, max: 32}),
    ]
  }

  validatePassword(vals) {
    if(vals.password1 !== vals.password2) {
      throw new Error('两个密码必须相同')
    }
  } 

  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user) {
      throw new Error('email已存在')
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {min: 4, max: 32})
    ]

    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少6个字符', {min: 6, max: 128})
    ]
  }

  validateLoginType(vals) {
    const type = vals.body.type
    if(!type) {
      throw new Error('type是必须参数')
    }

    if(!loginType.isThisType(type)) {
      throw new Error('type不合法')
    }
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  TokenValidator
}