const {Rule, LinValidator} = require('../../core/lin-validator')

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
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator
}