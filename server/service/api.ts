import { ApiModel } from '../model/api';
import { IApi } from '../types/index';

function createApi(api: IApi) {
  return ApiModel.create(api);
}

function getApiByUrl(url: string) {
  const reg = new RegExp(`.*${url}.*`, 'i');
  const condition = { url: reg };
  return ApiModel.findOne(condition).sort({ modifiedTime: -1 });
}
export { createApi, getApiByUrl };
