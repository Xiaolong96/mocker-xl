const path = require('path')
const loadFileList = require('../util/loadFileList')

const service = loadFileList(
  path.join(__dirname, "../service"),
  "service"
);


module.exports = {
  mock,
}

const sleep = ms => new Promise(resolve => setTimeout(() => resolve(true), ms))

async function mock(ctx) {
  console.log(ctx.url);
  try {
    const api =  await service.api.getApiByUrl(ctx.url);
    console.log(api, 'api')
    if(!api) return;
    // 方法不匹配
    if (api.options.method !== ctx.method) {
      ctx.status = 405
      return;
    }
    const delay = api.options.delay || 0;
    await sleep(delay)
    // TODO: 参数校验

    ctx.body = api.options.response || {};
  } catch (error) {
    console.log(error);
    ctx.respond.error('接口 mock 出错', {error})
  }
}

