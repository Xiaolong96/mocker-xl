const send = require('koa-send');
const Koa = require('koa');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');
// 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const bodyParser = require('koa-bodyparser');
const respond = require('./middleware/respond');
const {url} = require('./config/core').mongoose;

const app = new Koa();
app.use(bodyParser());
const startTime = new Date();
const appPORT = 1988;

app.use(respond())
// 调用路由
app.use(router.routes())


// 静态服务器 添加默认为Index.html
app.use(async function (ctx, next) {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS',
  })
  await send(ctx, ctx.path, {root: path.join(__dirname, '../client/'), index: 'index.html'});
})

// 连接数据库
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log('数据库连接成功')
  },
  err => {
    console.log(`数据库连接失败：${err}`)
  }
)

app.listen(appPORT, function () {
  console.log('后台管理界面运行于: http://localhost:%s', appPORT, '耗时:', new Date() - startTime, 'ms')
})