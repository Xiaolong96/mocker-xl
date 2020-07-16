const send = require('koa-send');
const Koa = require('koa');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');
// 对于POST请求的处理，koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
const bodyParser = require('koa-bodyparser');
const respond = require('./middleware/respond');
const config = require('./config/core');

const app = new Koa();
app.use(bodyParser());
const startTime = new Date().valueOf();

// 设置允许跨域，并支持携带cookie
app.use(async (ctx: any, next: any) => {
  // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'
  ctx.set('Access-Control-Allow-Origin', ctx.header.origin);
  // ctx.set(
  //   'Access-Control-Allow-Headers',
  //   'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , access-control-allow-origin'
  // );
  // ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', '*');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', true);
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
});

app.use(respond());
// 调用路由
app.use(router.routes());

// 静态服务器 添加默认为Index.html
app.use(async function(ctx: any) {
  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
  });
  await send(ctx, ctx.path, {
    root: path.join(__dirname, '../client/build/'),
    index: 'index.html'
  });
});

// 连接数据库
mongoose
  .connect(config.mongoose.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(
    () => {
      console.log('数据库连接成功');
    },
    (err: any) => {
      console.log(`数据库连接失败：${err}`);
    }
  );

app.listen(config.port, function() {
  console.log(
    '后台管理界面运行于: http://localhost:%s',
    config.port,
    '耗时:',
    new Date().valueOf() - startTime,
    'ms'
  );
});
