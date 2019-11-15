const util = require('util')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const  {Auth} = require('../../middlewares/auth')
const axios = require('axios')

class WXManage {
  static async codeToToken(code) {
    const {appId, appSecret, loginUrl} = global.config.wx
    const url = util.format(appId, appSecret, code)

    const result = axios.get(url)
    if(result.status !== 200) {
      throw new global.errs.AuthFailed('oppenid获取失败')
    }
    const errcode = result.data.errcode
    if(errcode !== 0) {
      throw new global.errs.AuthFailed('oppenid获取失败' + errcode)
    } 

    let user = await User.getUserByOpenid(result.data.openid) 
    if(!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManage
}