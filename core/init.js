const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
	static initCore(app) {
		InitManager.app = app
		InitManager.initLoadRouters()
		InitManager.loadHTTPExceptions()
	}

	static initLoadRouters() {
		const apiDirectory = `${process.cwd()}/app/api`
		requireDirectory(module, apiDirectory, {
			visit(obj) {
					if(obj instanceof Router) {
						InitManager.app.use(obj.routes())
					}
			}
		})
	}

	// 把所以异常挂载到global下，简化使用时的导入步骤，但是使用时注意拼写正确
	static loadHTTPExceptions() {
		const errors = require('./HTTPException.js')
		global.errs = errors
	}
}

module.exports = InitManager