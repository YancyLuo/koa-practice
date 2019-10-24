class HTTPException extends Error {
  constructor(msg="服务器异常", errorCode=10000, code=500) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = code 
  }
}

class ParameterException extends HTTPException {
  constructor(msg="参数错误", errorCode = 10000) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.code = 400 
  }
}

class Success extends HTTPException {
  constructor(meg, errorCode) {
    super() 
    this.msg = meg || 'ok'
    this.errorCode = errorCode || 0
    this.code = 201
  }
}

class AuthFailed extends HTTPException {
  constructor(meg, errorCode) {
    super() 
    this.msg = meg || '授权失败'
    this.errorCode = errorCode || 10004
    this.code = 401
  }
}

module.exports = {
  HTTPException,
  ParameterException,
  Success,
  AuthFailed
}