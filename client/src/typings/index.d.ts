// response 结构
export type Response<T> = {
  [P in keyof T]: T[P];
} & { code: number | string };
