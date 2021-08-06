const Koa = require('koa')
const Router = require('koa-router')

const router = new Router()
const app = new Koa()

// 简单请求跨域处理
app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*')
  if(ctx.request.method == 'OPTIONS') {
    ctx.status = 204
    ctx.response.set('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST', 'DELETE'])
    ctx.response.set('Access-Control-Allow-Headers', ['Content-Type', 'Accept'])
  }
  next()
})

// // 解决跨域问题
// app.use(cors({
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     // 允许接收cookie
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

router.get('/name', async (ctx) => {
  ctx.body = {
    name: 'miujg',
    age: 29
  }
})

router.put('/name', async (ctx) => {
  ctx.body = {
    name: 'miujg--put',
    age: 29
  }
})

router.get('/jsonp', async (ctx) => {
  let callbackName = ctx.query.callback || 'callback'
  let returnData = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().getTime(),
    }
  }
  let jsonpStr = `${callbackName}(${JSON.stringify(returnData)})`
  ctx.type = 'text/javascript'
  ctx.body = jsonpStr
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, ()=>{
  console.log('serve start on 3000')
})
