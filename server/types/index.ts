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
  project: string;
  createTime: number;
  modifiedTime: number;
}

// project 接口
export interface IProject extends mongoose.Document {
  projectId: string;
  name: string;
  desc: string;
  baseUrl: string;
  proxy: {
    target: string;
    cookie: string;
    status: number;
  };
  apis: string[];
  createTime: number;
  modifiedTime: number;
}
