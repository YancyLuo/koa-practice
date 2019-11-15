const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db.js')
const {Sequelize, Model} = require('sequelize')

class User extends Model{
  static async verifyEamilPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(!user) {
      throw new global.errs.AuthFailed('账号不存在')
    }

    const correct = bcrypt.compareSync(plainPassword, user.password)
    if(!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }

    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  // 主键 不能重复 不能为空
  // 自定用户编号方法，或者采用数据库递增生成用户编号
  // 数字的查询效果最好，尽量不使用随机字符串
  // 高并发的时候，自增可能出现重复的情况
  // 接口权限保护 Toke

  // id数据库会自动生成，也可以自定义
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: Sequelize.STRING, //昵称
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },  
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue('password', pwd)
    }
  },

  // 微信小程序自动生成的id，针对一个小程序唯一且不变
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})

module.exports = {
  User
}