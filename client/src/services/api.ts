import { Api } from 'typings/api';
import { request, Response } from '../axios/config';

interface RequestResponse {
  code: number;
  message: string;
  // success: boolean;
  data: any;
}

// 接口创建
export const apiCreate = async (params: Partial<Api>) => {
  const res = await request<Response<RequestResponse>>({
    url: '/api/create',
    method: 'POST',
    data: params,
  });
  return res && res.data;
};

// 接口查询
export const queryApi = async (params: { apiId: string }) => {
  const res = await request<Response<RequestResponse>>({
    url: '/api/query',
    method: 'GET',
    data: params,
  });
  return res && res.data;
};

// 接口更新
export const updateApi = async (params: Api) => {
  const res = await request<Response<RequestResponse>>({
    url: '/api/update',
    method: 'POST',
    data: params,
  });
  return res && res.data;
};

// 接口删除
export const deleteApi = async (params: { apiId: string }) => {
  const res = await request<Response<RequestResponse>>({
    url: '/api/delete',
    method: 'DELETE',
    data: params,
  });
  return res && res.data;
};
