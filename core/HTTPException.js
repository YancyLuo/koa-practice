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

module.exports = {
  HTTPException,
  ParameterException
}