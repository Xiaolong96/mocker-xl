// project 接口
export interface API {
  name: string;
  desc: string;
  url: string;
  options: {
    method: string;
    params: any;
    response: any;
    delay: number;
  };
  projectId: string;
  createTime: number;
  modifiedTime: number;
}
