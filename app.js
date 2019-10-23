const Koa = require('koa')
const InitManager = require('./core/init')
const bodyParser = require('koa-bodyparser')
const catchError  = require('./middlewares/exception.js')

require('./app/models/user')

const app = new Koa()
app.use(catchError)
app.use(bodyParser())


InitManager.initCore(app)
app.listen(3000)

