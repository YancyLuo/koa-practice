const {HTTPException} = require('../core/http-exception.js')

const catchError = async (ctx, next) => {
  try {
    const a = await next()
  } catch (error) {

    const isHTTPException = error instanceof HTTPException
    const idDev = global.config.enviroment === 'dev'

    // 开发环境下直接抛出异常
    if(idDev && !isHTTPException) {
      throw error
    }
    // 处理已知异常，返回错误信息，自定义的错误状态码，请求的方法与路径
    if(isHTTPException) {
      ctx.body = {
        message: error.msg,
        error_code: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.code
    }
    // 生产环境下处理未知异常
    else {
      console.log(error)
      ctx.body = {
        message: '服务器出错',
        error_code: 9999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
    }
    
  }
}

module.exports  = catchError