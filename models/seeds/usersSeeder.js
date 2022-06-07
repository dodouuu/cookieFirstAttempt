// 引用 Schema
const cookieFirstAttempt = require('../../models/cookieFirstAttempt')

const userList = require('../../users.json').users

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('start usersSeeder')
  cookieFirstAttempt.create(userList)
    .then(() => {
      console.log('usersSeeder create successfully!')
      db.close()
    })
    .catch(err => console.log(err))
})