const Sequelize = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect:'mysql',
  host,
  port,
  logging:true,
  timezone: '+08:00',
  define: {
    // update_time create_time 
    timestamps: true,
    // 重命名createdAt: 'created_at'
    // delete_time
    paranoid: true,
    // 下划线形式命名
    underscored: true,
  }
})

sequelize.sync()

module.exports = {
  sequelize
}