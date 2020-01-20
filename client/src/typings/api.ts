// project 接口
export interface Api {
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
