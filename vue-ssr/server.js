const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const fs = require('fs')
const path = require('path')
const vueServerRenderer = require('vue-server-renderer')
const koaStatic = require('koa-static')

// // 生成服务端的静态html
// const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8')
// // 生成静态html模板
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const render = vueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest
})

router.get('/',async (ctx)=>{
  // 这样写样式不会丢失 官方bug
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString((err,html) => {
      resolve(html)
    })
  }) 
});
app.use(router.routes());

app.use(koaStatic(path.resolve(__dirname, 'dist')))

app.listen(4000);