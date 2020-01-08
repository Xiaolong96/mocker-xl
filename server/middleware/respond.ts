/**
 * 返回格式化模块
 * 提供 ctx.respond.success和ctx.respond.error两种方法
 */

function error(ctx: any, data: any, code = 403) {
  if (typeof data === 'string') {
    ctx.body = {
      code,
      message: data
    };
  } else {
    ctx.body = {
      code: data.code,
      message: data.msg
    };
  }
}

function success(ctx: any, msg: string, data: any) {
  ctx.info.message = msg;
  ctx.body = {
    code: 200,
    message: msg,
    data: data
  };
}

module.exports = function() {
  return async function(ctx: any, next: () => void) {
    ctx.info = ctx.info || {};
    ctx.respond = ctx.respond || {};
    ctx.respond.success = success.bind(ctx, ctx);
    ctx.respond.error = error.bind(ctx, ctx);
    return next();
  };
};
