// response 结构
export type Response<T> = {
  [P in keyof T]: T[P];
} & { code: number | string };

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
