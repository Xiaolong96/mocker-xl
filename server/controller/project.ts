import path from 'path';
import { loadFileList } from '../util/loadFileList';
import { IProject } from '../types/index';

const service = loadFileList(path.join(__dirname, '../service'), 'service', null);

// 创建 mock API
async function createProject(ctx: any) {
  // 创建
  console.log(ctx.request.body);
  let rs: IProject;
  try {
    rs = await service.project.createProject(ctx.request.body);
    if (rs) {
      ctx.respond.success('项目创建成功', { data: rs });
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`项目创建失败: ${error}`);
  }
}

// 获取项目列表

async function getProjectList(ctx: any) {
  // 创建
  let rs: IProject[];
  try {
    rs = await service.project.getAllProject();
    if (rs) {
      ctx.respond.success('获取项目列表成功', rs);
    }
  } catch (error) {
    console.log(error);
    ctx.respond.error(`获取项目列表失败: ${error}`);
  }
}

module.exports = {
  createProject,
  getProjectList
};
