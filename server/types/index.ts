import mongoose from 'mongoose';
// api 接口
export interface IApi extends mongoose.Document {
  name: string;
  desc: string;
  url: string;
  options: {
    method: string;
    params: any;
    response: any;
    delay: number;
  };
  createTime: number;
  modifiedTime: number;
}
