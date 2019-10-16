const {HTTPException} = require('../core/HTTPException.js')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 处理已知异常，返回错误信息，自定义的错误状态码，请求的方法与路径
    if(error instanceof HTTPException) {
      ctx.body = {
        message: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
    // 处理未知异常
    else {
      console.dir(error)
    }
    
  }
}

module.exports  = catchError