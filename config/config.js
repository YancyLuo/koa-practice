
module.exports = {
  enviroment: 'prod',
  database: {
    dbName: 'island',
    host:'localhost',
    port:3306,
    user:'root',
    password:'123qweasd',
  },
  security: {
    secretKey: 'abcdefg',
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: '', //必须，但没有
    appSecret: '', //必须，但没有
    loginUrl: '...',
  }
}