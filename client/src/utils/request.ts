import axios, { AxiosRequestConfig } from 'axios';
import { message, notification } from 'antd';

type Response<T> = {
  [P in keyof T]: T[P];
} & { code: number | string };

// HTTP code码
const codeMessage: { [key: string]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '无数据',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户没有访问权限',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '方法不被允许',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const getBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    // 如果在开发环境的时候可以用于本地联调
    // return 'http://localhost:1988';
  }
  return '';
};

// 新创建一个axios实例，并进行基础配置
const instance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    // "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 再次设置token或者添加loading等请求前的操作
    // 添加一个loading
    // store.dispatch(actions.showLoading(true));
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加xi响应拦截器
instance.interceptors.response.use(
  response => {
    // 响应数据后做点什么
    // 添加一个loading
    // store.dispatch(actions.showLoading(false));
    // 存在业务异常 抛出给业务代码去捕获
    const { data } = response;
    if (data.code != 200) {
      const msg = data.msg || data.message || '';
      message.warning(msg);
      return Promise.reject(data);
    }
    // 不存在业务异常返回数据
    return data;
  },
  error => {
    if (error && error.response) {
      const { status } = error.response;
      console.warn(
        `http error: status-${status} message-${codeMessage[status]}`
      );

      if (codeMessage[status] !== null || undefined) {
        notification.warning({
          placement: 'topRight',
          duration: 2,
          message: '提示',
          description: `接口：${error.response.data.path}，${error.response.data.message}`,
        });
      } else {
        notification.warning({
          placement: 'topRight',
          duration: 2,
          message: '提示',
          description: error,
        });
      }
    }
    return Promise.reject(error); // 非业务异常无需抛出错误 内部吞掉
  }
);

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
const get = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    // {
    //   params: params
    // }
    instance
      .get(url, params)
      .then(res => {
        resolve(res);
      })
      ['catch'](err => {
        reject(err);
      });
  });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
const post = (url: string, data: any) => {
  return new Promise((resolve, reject) => {
    // qs.stringify(data)
    instance
      .post(url, data)
      .then(res => {
        console.log(res);
        resolve(res);
      })
      ['catch'](err => {
        reject(err);
      });
  });
};

function request<T>(config: AxiosRequestConfig): Promise<Response<T>> | null {
  let newUrl = config.url;
  if (
    (config.method === 'GET' ||
      config.method === 'DELETE' ||
      config.method === 'PUT') &&
    config.data
  ) {
    const param: string[] = [];
    Object.keys(config.data).map((v: string, k: number) => {
      param.push(`${v}=${encodeURIComponent(config.data[v])}`);
    });
    const paramStr = param.join('&');
    newUrl = `${newUrl}?${paramStr}`;
  }
  const curConfig = { ...config, url: newUrl };
  return (instance.request<Response<T>>(curConfig) as any) as Promise<
    Response<T>
  >;
}
export { get, post, request, Response };
