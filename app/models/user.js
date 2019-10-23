const {sequelize} = require('../../core/db.js')
const {Sequelize, Model} = require('sequelize')

class User extends Model{

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
  email: Sequelize.STRING,   
  password: Sequelize.STRING,

  // 微信小程序自动生成的id，针对一个小程序唯一且不变
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})