// require packages
const express = require('express')
const exphbs = require('express-handlebars')

const cookieParser = require('cookie-parser')

// 引用路由器
const routes = require('./routes')
require('./config/mongoose')

const app = express() // 生成一個伺服器

app.use(cookieParser())

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const PORT = process.env.PORT || 3000

// 設定短檔名 hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(express.urlencoded({ extended: true }))

// 將 request 導入路由器
app.use(routes)

// 設定應用程式監聽的埠號
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})