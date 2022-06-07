// 引用 Express
const express = require('express')

// 引用 Express 路由器
const router = express.Router()

// 引用 Schema
const cookieFirstAttempt = require('../../models/cookieFirstAttempt')

// 定義首頁路由
router.get('/', (req, res) => {

  console.log('YourMajesty=', req.cookies.YourMajesty)
  if (req.cookies.YourMajesty === undefined) {
    res.render('index')
  } else {
    const visitAgain = true
    res.render('welcome', { userFirstName: req.cookies.YourMajesty, visitAgain })
  }

})



// 顯示全部帳號密碼
router.post('/allUsers', (req, res) => {
  cookieFirstAttempt.find({})
    .lean()
    .then(users => {
      res.render('allUsers', { users })
    })
})

// 按下 Sign out
router.post('/logout', (req, res) => {
  console.log('Cookie YourMajesty=', req.cookies.YourMajesty, 'cleared')
  res.clearCookie('YourMajesty')

  const needAlert = false
  const email = ''
  const password = ''
  res.render('index', { needAlert, email, password })
})

// 按下 Sign in
router.post('/login', (req, res) => {
  cookieFirstAttempt.find({
    $and: [
      { email: req.body.email },
      { password: req.body.password }
    ]
  })
    .lean()
    .then(user => {
      // console.log('req email=', req.body.email)
      // console.log('req password=', req.body.password)
      // console.log('user=', user)
      if (user.length === 0) { // 沒有找到 user
        console.log('not found')
        const needAlert = true
        res.render('index', { needAlert, email: req.body.email, password: req.body.password })
      } else {
        console.log('found')
        const visitAgain = false
        res.render('welcome', { userFirstName: user[0].firstName, visitAgain })
        res.cookie('YourMajesty', user[0].firstName);
      }
    })
})

module.exports = router