import path from 'path';
import { loadFileList } from '../util/loadFileList';
import { IApi } from '../types/index';

const service = loadFileList(path.join(__dirname, '../service'), 'service', null);

// 创建 mock API
async function createApi(ctx: any) {
  // 创建
  const params = ctx.request.body;
  console.log(params);
  let rs: IApi;
  try {
    rs = await service.api.createApi(params);
    if (rs) {
      ctx.respond.success('接口创建成功', rs);
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`接口创建失败: ${error}`);
  }
}

// 创建 mock API
async function getApiList(ctx: any) {
  // 创建
  let rs: IApi;
  try {
    rs = await service.api.createApi({
      name: '接口测试',
      desc: '接口描述',
      url: '/mock/123/match',
      options: {
        method: 'POST',
        params: {},
        response: {
          msg: '创建成功'
        },
        delay: 0
      }
    });
    if (rs) {
      ctx.respond.success('接口创建成功', { data: rs });
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`查询api详细信息出错: ${error}`);
  }

  // try {
  //   // if (!finalParams.id) return ctx.respond.error('请提供API的ID')
  //   // let result = await apiGet.getApiById(finalParams.id)
  //   let result = [{
  //     url: 'https://www.easy-mock.com/mock/5d3ffde1a5fcf877553440f6/getList',
  //     desc: '获取列表(接口获取)'
  //   }, {
  //     url: 'https://www.easy-mock.com/mock/5d3ffde1a5fcf877553440f6/query',
  //     desc: '查询(接口获取)'
  //   }];
  //   if (!result) return ctx.respond.error('查询的API不存在或者已删除')
  //   ctx.respond.success('获取API详情成功', {list: result})
  // } catch (e) {
  //   return ctx.respond.error('查询api详细信息出错', {e})
  // }
}

// 查询api
async function queryApi(ctx: any) {
  let rs: IApi;
  const { apiId } = ctx.query;
  try {
    rs = await service.api.findApi(apiId);
    if (rs) {
      ctx.respond.success('api查询成功', rs);
    } else {
      ctx.respond.success('api查询结果为空', {});
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`api查询失败: ${error}`);
  }
}

// 更新api
async function updateApi(ctx: any) {
  const { _id } = ctx.request.body;
  if (!_id) {
    ctx.respond.error('参数错误，缺少 api id!');
  }
  let rs: IApi;
  try {
    rs = await service.api.updateApi(ctx.request.body);
    if (rs) {
      ctx.respond.success('api保存成功', rs);
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`api保存失败: ${error}`);
  }
}

// 删除api
async function deleteApi(ctx: any) {
  let rs: any;
  const { apiId } = ctx.request.body;
  console.log(ctx.request.body);
  console.log(ctx.query);
  try {
    rs = await service.api.deleteApi(apiId);
    if (rs) {
      ctx.respond.success('删除成功', {});
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`删除失败: ${error}`);
  }
}

module.exports = {
  createApi,
  getApiList,
  queryApi,
  updateApi,
  deleteApi
};
