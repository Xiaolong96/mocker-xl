import { request, Response } from '../axios/config';
import { Project } from '../typings/project';

interface RequestResponse {
  code: number;
  message: string;
  success: boolean;
  data: any;
}
// 项目创建
export const projectCreate = async (params: Partial<Project>) => {
  const res = await request<Response<RequestResponse>>({
    url: '/project/create',
    method: 'POST',
    data: params,
  });
  return res && res.data;
};

// 获取项目列表
export const getProjectList = async () => {
  const res = await request<Response<RequestResponse>>({
    url: '/project/list',
    method: 'GET',
  });
  return res && res.data;
};

// 查询项目
export const queryProject = async (params: { projectId: string }) => {
  const res = await request<Response<RequestResponse>>({
    url: '/project/query',
    method: 'GET',
    data: params,
  });
  return res && res.data;
};
