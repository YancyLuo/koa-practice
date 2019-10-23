const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
	static initCore(app) {
		InitManager.app = app
		InitManager.initLoadRouters()
		InitManager.loadHTTPExceptions()
		InitManager.loadConfig()
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

	// 把配置内容挂到global下
	static loadConfig(path = '') {
		const configPath = path || process.cwd() + '/config/config.js'
		const config = require(configPath)
		global.config = config
	}

	// 把所以异常挂载到global下，简化使用时的导入步骤，但是使用时注意拼写正确
	static loadHTTPExceptions() {
		const errors = require('./http-exception.js')
		global.errs = errors
	}
}

module.exports = InitManager