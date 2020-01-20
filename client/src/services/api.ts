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
